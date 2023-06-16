#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use oauth2::basic::BasicClient;
use serde_json::json;
use std::collections::HashMap;
use tauri::{
    api::path::{resolve_path, BaseDirectory},
    Env,
};
use tauri_plugin_store::StoreBuilder;

use crate::box_oauth::box_client;
mod commands;
mod box_oauth;

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
        ("first-run".to_string(), true.into()),
        ("aws-id".to_string(), "".into()),
        ("aws-secret".to_string(), "".into()),
        ("box_tokens".to_string(), json!({})),
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

            std::thread::spawn(move || {
                handle.plugin(
                    tauri_plugin_store::Builder::default()
                        .stores([settings, illustrations, preview])
                        .freeze()
                        .build(),
                )
            });

            Ok(())
        })
        .plugin(tauri_plugin_fs_watch::init())
        .invoke_handler(tauri::generate_handler![
            commands::get_etag,
            commands::get_auth_url,
            commands::request_token,
            commands::refresh_token,
        ])
        .run(context)
        .expect("error while running tauri application");
}
