#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri_plugin_store::PluginBuilder;
use tauri_plugin_fs_watch::Watcher;

fn main() {
  tauri::Builder::default()
    .plugin(PluginBuilder::default().build())
    .plugin(Watcher::default())
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
