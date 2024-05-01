// src/electron/preload/preload.ts
// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('ipcRenderer', {
    invoke: (channel: string, ...args: any[]) =>
        ipcRenderer.invoke(channel, ...args),
})
;(window as any).addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector: any, text: any) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.versions[dependency])
    }
})

let NODE_ENV: string = 'production'

if ('npm_lifecycle_event' in process.env) {
    NODE_ENV =
        process.env.npm_lifecycle_event === 'app:dev'
            ? 'development'
            : 'preview'
}

contextBridge.exposeInMainWorld('myAPI', {
    NODE_ENV: NODE_ENV,
})
