#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use serde_json::json;
use std::collections::HashMap;
use tauri::{
    api::path::{resolve_path, BaseDirectory},
    Env,
};
use tauri_plugin_store::{PluginBuilder, StoreBuilder};
use tauri_plugin_fs_watch::Watcher;

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
        ("projects".to_string(), json!([])),
        ("author-name".to_string(), "".into()),
        ("author-email".to_string(), "".into()),
        ("preferred-port".to_string(), "8765".into()),
        (
            "working-directory".to_string(),
            default_working_dir.to_str().into(),
        ),
    ]);

    let settings = StoreBuilder::new(".artisan-settings".parse().unwrap())
        .defaults(default_settings)
        .build();

    let projects = StoreBuilder::new(".artisan-projects".parse().unwrap()).build();

    tauri::Builder::default()
        .plugin(
            PluginBuilder::default()
                .stores([settings, projects])
                .freeze()
                .build(),
        )
        .plugin(Watcher::default())
        .run(context)
        .expect("error while running tauri application");
}
