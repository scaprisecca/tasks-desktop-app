interface WebDAVConfig {
  serverUrl: string;
  username: string;
  password: string;
}

export async function initializeWebDAV(config: WebDAVConfig) {
  // Store credentials securely using Tauri's built-in encryption
  await invoke('store_credentials', { config });
} 