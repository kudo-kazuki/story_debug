import { defineStore } from 'pinia'
import { DropdownItem, DeviceItem, DevicePreviewItemProps } from '@/types'
import { getFilenameFromPath } from '@/utils'

interface MainState {
    isLoadingAnimation: boolean
    backgroundImages: string[] | null
    emoticonImages: string[] | null
    characterImages: { [key: number | string]: string[] } | null
    activeBackgroundIndex: number | null
    activeEmoticonIndex: number | null
    activeCharacterId: number | string | null
    activeCharacterFaceIndex: number | null
    isOpenBackgroundSetting: boolean
    devicePreviewItems: DevicePreviewItemProps[]
}

export const deviceItems: DeviceItem = {
    1: {
        name: 'iPhoneSE',
        width: 1476,
        height: 2624,
    },
    2: {
        name: 'iPhone12ProMax',
        width: 1476,
        height: 2624,
    },
    3: {
        name: 'iPadPro',
        width: 2000,
        height: 2624,
    },
}

const defaultDevicePreviewItems: DevicePreviewItemProps[] = [
    {
        index: 0,
        deviceId: 1,
        characterId: null,
        characterFaceIndex: 0,
        backgroundImageIndex: 0,
    },
    {
        index: 1,
        deviceId: 2,
        characterId: null,
        characterFaceIndex: 0,
        backgroundImageIndex: 0,
    },
    {
        index: 2,
        deviceId: 3,
        characterId: null,
        characterFaceIndex: 0,
        backgroundImageIndex: 0,
    },
]

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
        activeCharacterFaceIndex: 0,
        isOpenBackgroundSetting: false,
        devicePreviewItems: defaultDevicePreviewItems,
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

        deleteDevicePreviewItem(index: number) {
            this.devicePreviewItems.splice(index, 1)
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

        characterImagesDropdownItems(): DropdownItem[] {
            let result: DropdownItem[] = []

            if (this.characterImages) {
                Object.keys(this.characterImages).forEach((id) => {
                    result.push({
                        value: id,
                        text: id,
                    })
                })
            }

            return result
        },

        characterFacesDropdownItems(): DropdownItem[] {
            let result: DropdownItem[] = []

            if (this.characterImages && this.activeCharacterId) {
                this.characterImages[this.activeCharacterId].forEach(
                    (image, index) => {
                        result.push({
                            value: index,
                            text: getFilenameFromPath(image),
                        })
                    },
                )
            }

            return result
        },
    },
})
