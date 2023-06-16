use std::path::PathBuf;

use md5::Context;
use serde_json::Value;
use tauri::api::file::read_binary;
use tauri::{AppHandle, State, Wry};

use oauth2::basic::{BasicClient, BasicTokenType};
use oauth2::reqwest::async_http_client;
use oauth2::{
    AuthorizationCode, CsrfToken, EmptyExtraTokenFields, StandardTokenResponse, TokenResponse,
};
use tauri_plugin_store::{with_store, StoreCollection};

#[tauri::command]
pub fn get_etag(path: String) -> String {
    let contents = read_binary(path).expect("failed to resolve path");

    let mut hasher = Context::new();
    hasher.consume(&contents);
    let hash = hasher.compute();
    format!("{:x}", hash)
}

#[tauri::command]
pub fn get_auth_url(client: State<'_, BasicClient>) -> String {
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
    access_code: String,
    app_handle: AppHandle,
    stores: State<'_, StoreCollection<Wry>>,
    client: State<'_, BasicClient>,
) -> Result<(), String> {
    let path: PathBuf = PathBuf::from(".settings");
    // Define input from frontend as auth code
    let code = AuthorizationCode::new(access_code);

    // Async request to client
    let token_res = client
        .exchange_code(code)
        .request_async(async_http_client)
        .await;

    let tokens_res = token_res.map_err(|err| err.to_string())?;

    // Serialize response to json
    // Expected API response: https://developer.box.com/reference/resources/access-token/
    let data: Value = serde_json::to_value(tokens_res).unwrap();

    // Addds JSON data to the store
    with_store(app_handle, stores, path, |store| {
        store.insert("box_tokens".to_string(), data).ok();
        store.save()
    })
    .map_err(|err| err.to_string())?;

    Ok(())
}

/*
 * Requests a new access token by using the
 * saved refresh_token in the .settings store
 * It then saves the new tokens to to store
 */
#[tauri::command(async)]
pub async fn refresh_token(
    app_handle: AppHandle,
    stores: State<'_, StoreCollection<Wry>>,
    client: State<'_, BasicClient>,
) -> Result<(), String> {
    let path: PathBuf = PathBuf::from(".settings");

    let tokens: Option<Value> = with_store(app_handle.clone(), stores.clone(), &path, |store| {
        Ok(store.get("box_tokens".to_string()).cloned())
    })
    .map_err(|err| err.to_string())?;

    let token_res: StandardTokenResponse<EmptyExtraTokenFields, BasicTokenType> =
        serde_json::from_value(tokens.unwrap()).map_err(|err| err.to_string())?;

    let refresh_token = token_res.refresh_token().unwrap();
    let new_token_res = client
        .exchange_refresh_token(refresh_token)
        .request_async(async_http_client)
        .await;

    let new_token_res = new_token_res.map_err(|err| err.to_string())?;

    let data: Value = serde_json::to_value(new_token_res).unwrap();

    // Addds JSON data to the store
    with_store(app_handle, stores, path, |store| {
        store.insert("box_tokens".to_string(), data).ok();
        store.save()
    })
    .map_err(|err| err.to_string())?;

    Ok(())
}
