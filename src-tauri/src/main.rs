#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use serde_json::json;
use tauri::{api::path::{BaseDirectory, resolve_path}, Env};
use tauri_plugin_store::{PluginBuilder, StoreBuilder};
use std::collections::HashMap;

fn main() {

  let context = tauri::generate_context!();
  let default_working_dir = resolve_path(context.config(), context.package_info(), &Env::default(), "Artisan", Some(BaseDirectory::Home)).expect("failed to resolve path");

  let mut default_settings = HashMap::new();

  default_settings.insert("first-run".to_string(), true.into());
  default_settings.insert("projects".to_string(), json!([]));
  default_settings.insert("author-name".to_string(), "".into());
  default_settings.insert("author-email".to_string(), "".into());
  default_settings.insert("preferred-port".to_string(), "8765".into());
  default_settings.insert("working-directory".to_string(), default_working_dir.to_str().into());

  let settings = StoreBuilder::new(".artisan-settings".parse().unwrap())
    .defaults(default_settings)
    .build();

  let projects = StoreBuilder::new(".artisan-projects".parse().unwrap())
    .build();

  tauri::Builder::default()
    .plugin(PluginBuilder::default().stores([settings, projects]).freeze().build())
    .run(context)
    .expect("error while running tauri application");
}
