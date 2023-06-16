use std::path::PathBuf;

use md5::Context;
use serde_json::Value;
use tauri::api::file::read_binary;
use tauri::Wry;

use oauth2::reqwest::async_http_client;
use oauth2::{AuthorizationCode, CsrfToken, RefreshToken};
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
    let client = &box_client();

    // Get full URL, ignore CSRF token
    let (authorize_url, _csrf_state) = client.authorize_url(CsrfToken::new_random).url();

    // Return url string to frontend
    String::from(authorize_url)
}

// This function is async so it doesn't block the main thread
// We should ablo to continue to request new tokens
// without hitching any part of the UI
#[tauri::command(async)]
pub async fn request_token(
    access_code: Option<String>,
    resfresh_token: Option<String>,
    app_handle: tauri::AppHandle,
    state: tauri::State<'_, StoreCollection<Wry>>,
) -> Result<(), String> {
    let mut data: Result<Value, serde_json::Error> = serde_json::to_value("{}");

    if let Some(code) = access_code {
        data = request_access_token(code).await;
    } else if let Some(token) = resfresh_token {
        data = refresh_access_token(token).await;
    }

    let path = PathBuf::from(".settings");

    // Addds JSON data to the store
    with_store(app_handle, state, &path, |store| {
        store.insert("box_tokens".to_string(), data.unwrap()).ok();
        store.save()
    })
    .map_err(|err| err.to_string())?;

    Ok(())
}

pub async fn refresh_access_token(
    refresh_token: String,
) -> Result<Value, serde_json::Error> {
    let client = &box_client();

    let token = RefreshToken::new(refresh_token);

    let token_res = client
        .exchange_refresh_token(&token)
        .request_async(async_http_client)
        .await;

    let tokens = token_res.expect("Response should be valid tokens");

    // Serialize response to json
    // Expected API response: https://developer.box.com/reference/resources/access-token/
    serde_json::to_value(tokens)
}

pub async fn request_access_token(
    access_code: String,
) -> Result<Value, serde_json::Error> {
    let client = &box_client();

    // Define input from frontend as auth code
    let code = AuthorizationCode::new(access_code);

    // Async request to client
    let token_res = client
        .exchange_code(code)
        .request_async(async_http_client)
        .await;

    let tokens = token_res.expect("Response should be valid tokens");

    // Serialize response to json
    // Expected API response: https://developer.box.com/reference/resources/access-token/
    serde_json::to_value(tokens)
}
