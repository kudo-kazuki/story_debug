import { join } from 'path'
import { app, BrowserWindow, screen, ipcMain } from 'electron'
import path from 'path'
import fs from 'fs'

let NODE_ENV: string = 'production'
if ('npm_lifecycle_event' in process.env) {
    NODE_ENV =
        process.env.npm_lifecycle_event === 'app:dev'
            ? 'development'
            : 'preview'
}

const isDev = NODE_ENV === 'development' ? true : false
const isPreview = NODE_ENV === 'preview' ? true : false

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
            contextIsolation: true,
        },
    })

    // and load the index.html of the app.
    mainWindow.loadURL(
        isDev ? 'http://localhost:5173' : join(__dirname, '../../index.html'),
    )
    // Open the DevTools.
    // if (isDev) {
    mainWindow.webContents.openDevTools()
    // }
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

let imagesDir
if (isDev || isPreview) {
    // 開発時のパス
    imagesDir = path.resolve(process.cwd(), 'images')
} else {
    // ビルド時のパス
    imagesDir = path.resolve(process.resourcesPath, 'images')
}

console.log('imagesDir:', imagesDir)

const BackgroundDir = imagesDir + '\\Background'
console.log('BackgroundDir:', BackgroundDir)
ipcMain.handle('get-background-images', async () => {
    const files = await fs.promises.readdir(BackgroundDir)
    const imageFiles = files
        .filter((file: string) => /\.(jpg|jpeg|png|gif)$/i.test(file))
        .map((file: string) =>
            isDev
                ? `images/Background/${file}`
                : `file://${path.join(BackgroundDir, file)}`,
        ) // 絶対パスに変換
    return imageFiles
})

const EmoticonDir = imagesDir + '\\Emoticon'
console.log('EmoticonDir:', EmoticonDir)
ipcMain.handle('get-emotion-images', async () => {
    const files = await fs.promises.readdir(EmoticonDir)
    const imageFiles = files
        .filter((file: string) => /\.(jpg|jpeg|png|gif)$/i.test(file))
        .map((file: string) =>
            isDev
                ? `images/Emoticon/${file}`
                : `file://${path.join(EmoticonDir, file)}`,
        ) // 絶対パスに変換
    return imageFiles
})

const CharacterDir = imagesDir + '\\Character'
console.log('CharacterDir:', CharacterDir)

interface FaceImages {
    [key: number | string]: string[]
}

ipcMain.handle('get-face-images', async () => {
    const dirs = await fs.promises.readdir(CharacterDir)
    const faceImages: FaceImages = {}
    for (const dir of dirs) {
        const files = await fs.promises.readdir(path.join(CharacterDir, dir))
        const imageFiles = files
            .filter((file: string) => /\.(jpg|jpeg|png|gif)$/i.test(file))
            .filter((file: string) => !new RegExp(`^${dir}\.png$`).test(file)) // dir.pngというファイルを除外
            .map((file: string) =>
                isDev
                    ? `images/Character/${dir}/${file}`
                    : `file://${path.join(CharacterDir + '\\' + dir, file)}`,
            ) // 絶対パスに変換

        faceImages[dir] = imageFiles
    }
    return faceImages
})

interface CharacterImages {
    [key: number | string]: string
}
ipcMain.handle('get-character-images', async () => {
    const dirs = await fs.promises.readdir(CharacterDir)
    const characterImages: CharacterImages = {}
    for (const dir of dirs) {
        characterImages[dir] = isDev
            ? `images/Character/${dir}/${dir}.png`
            : `file://${path.join(CharacterDir + '\\' + dir + '\\' + dir + '.png')}`
    }
    return characterImages
})
