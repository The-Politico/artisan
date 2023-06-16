use std::path::PathBuf;

use md5::Context;
use tauri::api::file::read_binary;
use tauri::Wry;

use oauth2::reqwest::async_http_client;
use oauth2::{AuthorizationCode, CsrfToken};
use tauri_plugin_store::{with_store, StoreCollection};

use crate::box_oauth::box_client;

#[tauri::command]
pub fn get_etag(path: String) -> String {
    let contents = read_binary(path).expect("failed to resolve path");

    let mut hasher = Context::new();
    hasher.consume(&contents);
    let hash = hasher.compute();
    format!("{:x}", hash)
}

#[tauri::command]
pub fn get_auth_url() -> String {
    let client = box_client();

    // Get full URL, ignore CSRF token
    let (authorize_url, _csrf_state) = client.authorize_url(CsrfToken::new_random).url();

    // Return url string to frontend
    authorize_url.to_string()
}

// This function is async so it doesn't block the main thread
// We should ablo to continue to request new tokens without hitching any part
// of the UI
#[tauri::command(async)]
pub async fn request_token(
    access_code: String,
    app_handle: tauri::AppHandle,
    state: tauri::State<'_, StoreCollection<Wry>>,
) -> Result<(), String> {
    let client = box_client();

    // Define input from frontend as auth code
    let code = AuthorizationCode::new(access_code);

    // Async request to client
    let token_res = client
        .exchange_code(code.to_owned())
        .request_async(async_http_client)
        .await;

    let tokens = token_res.expect("Response should be valid tokens");

    // Serialize response to json
    // Expected API response: https://developer.box.com/reference/resources/access-token/
    let json = serde_json::to_value(tokens).unwrap();

    // Addds the first access_token to the store
    with_store(app_handle, state, PathBuf::from(".settings"), |store| {
        store.insert("box_tokens".to_string(), json)
    })
    .map_err(|err| err.to_string())?;

    Ok(())
}
