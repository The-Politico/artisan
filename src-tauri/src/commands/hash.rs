use md5::Context;
use tauri::api::file::read_binary;

#[tauri::command]
pub fn md5(path: String) -> String {
    let contents = read_binary(path).expect("failed to resolve path");

    let mut hasher = Context::new();
    hasher.consume(&contents);
    let hash = hasher.compute();
    format!("{:x}", hash)
}