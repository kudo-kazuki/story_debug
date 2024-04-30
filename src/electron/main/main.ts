import { join } from 'path'
import { app, BrowserWindow, screen, ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'

const isDev = process.env.npm_lifecycle_event === 'app:dev' ? true : false

if (isDev) {
    try {
        require('electron-reloader')(module)
    } catch (_) {}
}

function createWindow() {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize

    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: width - 20,
        height: height - 20,
        webPreferences: {
            preload: join(__dirname, '../preload/preload.js'),
            // Autofillを無効にする
            disableBlinkFeatures: 'Autofill',
        },
    })

    // and load the index.html of the app.
    mainWindow.loadURL(
        isDev ? 'http://localhost:5173' : join(__dirname, '../../index.html'),
    )
    // Open the DevTools.
    if (isDev) {
        mainWindow.webContents.openDevTools()
    }
    mainWindow.setMenuBarVisibility(false)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow()
    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

ipcMain.handle('get-image-files', async () => {
    const imagesDir = path.join(__dirname, 'images')
    const files = await fs.promises.readdir(imagesDir)
    const imageFiles = files.filter((file: string) =>
        /\.(jpg|jpeg|png|gif)$/i.test(file),
    )
    return imageFiles
})