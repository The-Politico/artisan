#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod commands;
mod oauth_client;

use oauth2::basic::BasicClient;
use serde_json::json;
use std::collections::HashMap;
use tauri::{
    api::path::{resolve_path, BaseDirectory},
    Env,
};
use tauri_plugin_store::StoreBuilder;

use crate::commands::{
    hash,
    oauth::{get_auth_url, refresh_token, request_token},
};
use crate::oauth_client::box_client;

fn main() {
    let context = tauri::generate_context!();

    let default_working_dir = resolve_path(
        context.config(),
        context.package_info(),
        &Env::default(),
        "Artisan",
        Some(BaseDirectory::Home),
    )
    .expect("failed to resolve path");

    let default_settings = HashMap::from([
        ("preferred-port".to_string(), "8765".into()),
        (
            "working-directory".to_string(),
            default_working_dir.to_str().into(),
        ),
    ]);

    let default_preview = HashMap::from([
        ("project".to_string(), json!(null)),
        ("process".to_string(), json!(null)),
    ]);

    let default_auth = HashMap::from([
        ("box_tokens".to_string(), json!({})),
        ("username".to_string(), "".into()),
        ("user_id".to_string(), "".into()),
    ]);

    let client: BasicClient = box_client();

    tauri::Builder::default()
        .manage(client)
        .setup(|app| {
            let handle = app.handle();
            let settings = StoreBuilder::new(app.handle(), ".settings".parse()?)
                .defaults(default_settings)
                .build();

            let preview = StoreBuilder::new(app.handle(), ".preview".parse()?)
                .defaults(default_preview)
                .build();

            let illustrations = StoreBuilder::new(app.handle(), ".illustrations".parse()?).build();

            let auth = StoreBuilder::new(app.handle(), ".auth".parse()?)
                .defaults(default_auth)
                .build();

            std::thread::spawn(move || {
                handle.plugin(
                    tauri_plugin_store::Builder::default()
                        .stores([settings, illustrations, preview, auth])
                        .freeze()
                        .build(),
                )
            });

            Ok(())
        })
        .plugin(tauri_plugin_fs_watch::init())
        .invoke_handler(tauri::generate_handler![
            hash::md5,
            get_auth_url,
            request_token,
            refresh_token
        ])
        .run(context)
        .expect("error while running tauri application");
}
