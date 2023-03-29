#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
  )]

use serde_json::json;
use std::collections::HashMap;
use md5::{Context}; 
use tauri::{
  api::path::{resolve_path, BaseDirectory},
  Env,
};
use tauri_plugin_store::StoreBuilder;

#[tauri::command]
fn hash_file(contents: Vec<u8>) -> String {
  let mut hasher = Context::new();
  hasher.consume(&contents);
  let hash = hasher.compute();
  format!("{:x}", hash)
}

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
      ("author-name".to_string(), "".into()),
      ("author-email".to_string(), "".into()),
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

  tauri::Builder::default()
      .setup(|app| {
        let handle = app.handle();
        let settings = StoreBuilder::new(app.handle(), ".artisan-settings-new".parse()?)
          .defaults(default_settings)
          .build();

        let preview = StoreBuilder::new(app.handle(), ".artisan-preview-new".parse()?)
          .defaults(default_preview)
          .build();
        
        let entities =
            StoreBuilder::new(app.handle(), ".artisan-entities-new".parse()?).build();
        
        std::thread::spawn(move || {
            handle.plugin(
                tauri_plugin_store::Builder::default()
                    .stores([settings, entities, preview])
                    .freeze()
                    .build(),
            )
        });

        Ok(())
      })
      .plugin(tauri_plugin_fs_watch::init())
      .invoke_handler(tauri::generate_handler![hash_file])
      .run(context)
      .expect("error while running tauri application");
}
