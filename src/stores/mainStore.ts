import { defineStore } from 'pinia'
import { DropdownItem } from '@/types'
import { getFilenameFromPath } from '@/utils'

interface MainState {
    isLoadingAnimation: boolean
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
        isLoadingAnimation: true,
        backgroundImages: null,
        emoticonImages: null,
        characterImages: null,
        activeBackgroundIndex: 0,
        activeEmoticonIndex: null,
        activeCharacterId: null,

        isOpenBackgroundSetting: false,
    }),
    actions: {
        showLoadingAnimation() {
            console.log('showLoadingAnimation')
            this.isLoadingAnimation = true
        },

        hideLoadingAnimation() {
            console.log('hideLoadingAnimation')
            this.isLoadingAnimation = false
        },

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

        setActiveBackgroundIndex(
            currentPage: number,
            perPage: number,
            index: number,
        ) {
            this.activeBackgroundIndex = (currentPage - 1) * perPage + index
        },
    },
    getters: {
        backgroundImagesDropdownItems(): DropdownItem[] {
            return this.backgroundImages
                ? this.backgroundImages.map((image, index) => ({
                      value: index,
                      text: getFilenameFromPath(image),
                  }))
                : []
        },
    },
})
