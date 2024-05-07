import { defineStore } from 'pinia'

interface MainState {
    backgroundImages: string[] | null
    emoticonImages: string[] | null
    characterImages: { [key: number | string]: string[] } | null
    activeBackgroundIndex: number | null
    activeEmoticonIndex: number | null
    activeCharacterId: number | string | null
    isOpenBackgroundSetting: boolean
}

export const useMainStore = defineStore({
    id: 'main',
    state: (): MainState => ({
        backgroundImages: null,
        emoticonImages: null,
        characterImages: null,
        activeBackgroundIndex: 0,
        activeEmoticonIndex: null,
        activeCharacterId: null,

        isOpenBackgroundSetting: false,
    }),
    actions: {
        setBackgroundImages(images: string[]) {
            this.backgroundImages = images
            console.log('this.backgroundImages', this.backgroundImages)
        },

        setEmoticonImages(images: string[]) {
            this.emoticonImages = images
            console.log('this.emoticonImages', this.emoticonImages)
        },

        setCharacterImages(images: { [key: number | string]: string[] }) {
            this.characterImages = images

            // オブジェクトのキーの配列を取得し、その最初のキーをactiveCharacterIdに設定
            this.activeCharacterId = Object.keys(images)[0]

            console.log('this.characterImages', this.characterImages)
            console.log('this.activeCharacterId', this.activeCharacterId)
        },

        openBackgroundSetting() {
            this.isOpenBackgroundSetting = true
        },

        closeBackgroundSetting() {
            this.isOpenBackgroundSetting = false
        },
    },
})
