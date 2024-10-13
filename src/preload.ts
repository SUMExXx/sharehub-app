// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
    // env: {
    //     REACT_APP_API_BASE_URL: process.env.API_BASE_URL,
    // },
    minimizeWindow: () => ipcRenderer.send('minimize-window'),
    maximizeWindow: () => ipcRenderer.send('maximize-window'),
    closeWindow: () => ipcRenderer.send('close-window'),
    initRoot: () => ipcRenderer.invoke('init-root'),
    saveImage: async (groupId: string, imageId: string) => {
        return await ipcRenderer.invoke('save-image', { groupId, imageId })
    }
});
