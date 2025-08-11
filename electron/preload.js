const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Add any inter-process communication methods here
  ping: () => ipcRenderer.invoke('ping'),
});
