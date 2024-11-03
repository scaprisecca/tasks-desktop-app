import { invoke } from '@tauri-apps/api';
import { writeTextFile, readTextFile } from '@tauri-apps/api/fs';
import { appDataDir } from '@tauri-apps/api/path';

export async function saveTask(task: Task) {
  // Save to local storage
  const appDir = await appDataDir();
  await writeTextFile(`${appDir}/tasks.json`, JSON.stringify(task));
  
  // You can call Rust functions if needed using invoke
  await invoke('sync_with_webdav', { task });
} 