import { defineStore } from 'pinia'
import { DropdownItem, DeviceItem, DevicePreviewItemProps } from '@/types'
import { getFilenameFromPath } from '@/utils'

interface MainState {
    isLoadingAnimation: boolean
    backgroundImages: string[] | null
    emoticonImages: string[] | null
    faceImages: { [key: number | string]: string[] } | null
    characterImages: { [key: number | string]: string } | null
    activeBackgroundIndex: number | null
    activeEmoticonIndex: number | null
    activeCharacterId: number | string | null
    activefaceIndex: number | null
    openBackgroundSettingModalNumber: number | null
    openCharacterSettingModalNumber: number | null
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
        faceIndex: 0,
        backgroundImageIndex: 0,
    },
    {
        index: 1,
        deviceId: 2,
        characterId: null,
        faceIndex: 0,
        backgroundImageIndex: 0,
    },
    {
        index: 2,
        deviceId: 3,
        characterId: null,
        faceIndex: 0,
        backgroundImageIndex: 0,
    },
]

export const useMainStore = defineStore({
    id: 'main',
    state: (): MainState => ({
        isLoadingAnimation: true,
        backgroundImages: null,
        emoticonImages: null,
        faceImages: null,
        characterImages: null,
        activeBackgroundIndex: 0,
        activeEmoticonIndex: null,
        activeCharacterId: null,
        activefaceIndex: 0,
        openBackgroundSettingModalNumber: null,
        openCharacterSettingModalNumber: null,
        devicePreviewItems: defaultDevicePreviewItems,
    }),
    actions: {
        showLoadingAnimation() {
            this.isLoadingAnimation = true
        },

        hideLoadingAnimation() {
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

        setFaceImages(images: { [key: number | string]: string[] }) {
            this.faceImages = images
            console.log('this.faceImages', this.faceImages)
        },

        setCharacterImages(images: { [key: number | string]: string }) {
            this.characterImages = images
            console.log('this.characterImages', this.characterImages)

            // オブジェクトのキーの配列を取得し、その最初のキーをactiveCharacterIdに設定
            const firstCharacterId = Object.keys(images)[0]
            this.devicePreviewItems.forEach((item) => {
                item.characterId = firstCharacterId
            })
        },

        openBackgroundSetting(devicePreviewItemIndex: number | null = null) {
            this.openBackgroundSettingModalNumber = devicePreviewItemIndex
        },

        closeBackgroundSetting() {
            this.openBackgroundSettingModalNumber = null
        },

        openCharacterSetting(devicePreviewItemIndex: number | null = null) {
            this.openCharacterSettingModalNumber = devicePreviewItemIndex
        },

        closeCharacterSetting() {
            this.openCharacterSettingModalNumber = null
        },

        setActiveBackgroundIndex(
            devicePreviewItemIndex: number,
            currentPage: number,
            perPage: number,
            index: number,
        ) {
            this.devicePreviewItems[
                devicePreviewItemIndex
            ].backgroundImageIndex = (currentPage - 1) * perPage + index
        },

        setActiveCharacterId(
            devicePreviewItemIndex: number,
            id: number | string,
        ) {
            this.devicePreviewItems[devicePreviewItemIndex].characterId = id
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
        /*
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
        */
    },
})
