use std::path::PathBuf;

use md5::Context;
use oauth2::basic::BasicClient;
use serde_json::json;
use tauri::api::file::read_binary;
use tauri::Wry;

use dotenv_codegen::dotenv;
use oauth2::reqwest::async_http_client;
use oauth2::{
    AuthType, AuthUrl, AuthorizationCode, ClientId, ClientSecret, CsrfToken, RedirectUrl,
    StandardTokenResponse, TokenResponse, TokenUrl,
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

pub fn box_client() -> BasicClient {
    let box_client_id = ClientId::new(dotenv!("BOX_CLIENT_ID").to_string());
    let box_client_secret = ClientSecret::new(dotenv!("BOX_CLIENT_SECRET").to_string());
    let auth_url = AuthUrl::new("https://account.box.com/api/oauth2/authorize".to_string())
        .expect("Invalid authorization endpoint URL");
    let token_url = TokenUrl::new("https://api.box.com/oauth2/token".to_string())
        .expect("Invalid token endpoint URL");

    let client = BasicClient::new(
        box_client_id,
        Some(box_client_secret),
        auth_url,
        Some(token_url),
    )
    .set_auth_type(AuthType::RequestBody)
    .set_redirect_uri(
        RedirectUrl::new("http://localhost:5173/src/oauth/index.html".to_string())
            .expect("Invalid redirect URL"),
    );
    client
}

#[tauri::command]
pub fn get_auth_url() -> String {
    let client = box_client();

    let (authorize_url, csrf_state) = client.authorize_url(CsrfToken::new_random).url();

    authorize_url.to_string()
}

#[tauri::command(async)]
pub async fn request_token(
    access_code: String,
    app_handle: tauri::AppHandle,
    state: tauri::State<'_, StoreCollection<Wry>>,
) -> Result<(), String> {
    let client = box_client();

    let code = AuthorizationCode::new(access_code);
    let token_res = client
        .exchange_code(code.to_owned())
        .request_async(async_http_client)
        .await;

    let path = PathBuf::from(".settings");

    let tokens = token_res.expect("Response should be valid tokens");

    let json = serde_json::to_value(tokens).unwrap();

    // Addds the first access_token to the store
    with_store(app_handle, state, path, |store| {
        store.insert(
            "box_tokens".to_string(),
            json,
        )
    })
    .map_err(|err| err.to_string())?;

    Ok(())
}
