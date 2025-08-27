const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  showFileDialog: () => ipcRenderer.invoke('show-file-dialog'),
  showSaveDialog: () => ipcRenderer.invoke('show-save-dialog'),
  showMessageBox: (options) => ipcRenderer.invoke('show-message-box', options),
  platform: process.platform
});
