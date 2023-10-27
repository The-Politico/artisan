use serde_json::Value;
use std::path::PathBuf;
use tauri::{AppHandle, State, Wry};
use tauri_plugin_store::{with_store, StoreCollection};

use oauth2::basic::{BasicClient, BasicTokenType};
use oauth2::reqwest::async_http_client;
use oauth2::{
    AuthorizationCode, CsrfToken, EmptyExtraTokenFields, StandardTokenResponse, TokenResponse,
};

#[tauri::command]
pub fn get_auth_url(client: State<'_, BasicClient>) -> String {
    // Get full URL, ignore CSRF token
    let (authorize_url, _csrf_state) = client.authorize_url(CsrfToken::new_random).url();

    // Return url string to frontend
    String::from(authorize_url)
}

/**
 * Asynchronously requests a Box API access token
 * by exchanging an input authorization code.
 * The TokenResponse is saved to the application store
 */
#[tauri::command(async)]
pub async fn request_token(
    access_code: String,
    app_handle: AppHandle,
    stores: State<'_, StoreCollection<Wry>>,
    client: State<'_, BasicClient>,
) -> Result<(), String> {
    let path: PathBuf = PathBuf::from(".auth");
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
 * Asynchronously requests a new access token by using the
 * saved refresh_token in the application store.
 * The new TokenResponse is saved to the store again.
 */
#[tauri::command(async)]
pub async fn refresh_token(
    app_handle: AppHandle,
    stores: State<'_, StoreCollection<Wry>>,
    client: State<'_, BasicClient>,
) -> Result<(), String> {
    let path: PathBuf = PathBuf::from(".auth");

    // Retrieve tokens from the store
    let tokens: Option<Value> = with_store(app_handle.clone(), stores.clone(), &path, |store| {
        Ok(store.get("box_tokens".to_string()).cloned())
    })
    .map_err(|err| err.to_string())?;

    // Interprets JSON value as StandardTokenResponse
    let token_res: StandardTokenResponse<EmptyExtraTokenFields, BasicTokenType> =
        serde_json::from_value(tokens.unwrap()).map_err(|err| err.to_string())?;

    // Gets refence to RefreshToken
    let refresh_token = token_res.refresh_token().unwrap();

    // Requests new access token and returns new TokenResponse
    let new_token_res = client
        .exchange_refresh_token(refresh_token)
        .request_async(async_http_client)
        .await
        .map_err(|err| err.to_string())?;

    // Redeclares variable for unwrapping
    let new_token_res = new_token_res;

    // Converts TokenResponse to JSON value
    let data: Value = serde_json::to_value(new_token_res).unwrap();

    // Addds JSON data to the store
    with_store(app_handle, stores, path, |store| {
        store.insert("box_tokens".to_string(), data).ok();
        store.save()
    })
    .map_err(|err| err.to_string())?;

    Ok(())
}
