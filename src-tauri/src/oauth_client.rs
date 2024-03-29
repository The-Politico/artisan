use dotenvy_macro::dotenv;
use oauth2::basic::BasicClient;
use oauth2::{AuthType, AuthUrl, ClientId, ClientSecret, RedirectUrl, TokenUrl};

pub fn box_client() -> BasicClient {
    let box_client_id = ClientId::new(dotenv!("BOX_CLIENT_ID").to_string());
    let box_client_secret = ClientSecret::new(dotenv!("BOX_CLIENT_SECRET").to_string());
    let auth_url = AuthUrl::new("https://account.box.com/api/oauth2/authorize".to_string())
        .expect("Invalid authorization endpoint URL");
    let token_url = TokenUrl::new("https://api.box.com/oauth2/token".to_string())
        .expect("Invalid token endpoint URL");

    let lifecycle = std::option_env!("npm_lifecycle_script").unwrap();

    let url = if lifecycle.contains("dev") {
        "http://localhost:5173/oauth/"
    } else {
        "tauri://localhost/oauth/"
    };

    BasicClient::new(
        box_client_id,
        Some(box_client_secret),
        auth_url,
        Some(token_url),
    )
    .set_auth_type(AuthType::RequestBody)
    .set_redirect_uri(
        RedirectUrl::new(url.to_string()).expect("Invalid redirect URL"),
    )
}
