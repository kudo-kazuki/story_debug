declare global {
    interface Window {
        ipcRenderer: {
            invoke: (channel: string, ...args: any[]) => Promise<any>
        }
        NODE_ENV: string
    }
}
