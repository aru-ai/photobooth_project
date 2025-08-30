import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  // Add functions you want to expose to frontend
  ping: () => console.log('Preload script loaded!'),
});
