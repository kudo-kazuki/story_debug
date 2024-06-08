import { defineStore } from 'pinia'
import {
    DropdownItem,
    DeviceItem,
    RadioButtonGroupItem,
    DevicePreviewItemProps,
} from '@/types'
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
    openFaceSettingModalNumber: number | null
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
export const deviceDropDownItems: DropdownItem[] = Object.keys(deviceItems).map(
    (key) => ({
        value: key,
        text: deviceItems[key].name,
    }),
)

export const characterPositionItems: RadioButtonGroupItem[] = [
    {
        value: 'left',
        text: '左',
    },
    {
        value: 'center',
        text: '中央',
    },
    {
        value: 'right',
        text: '右',
    },
]

const memoDeafult = 'ここで炎のエフェクトを出します。\n音楽：〇〇の曲に切り替え'

const defaultDevicePreviewItems: DevicePreviewItemProps[] = [
    {
        index: 0,
        deviceId: 1,
        characterId: null,
        faceIndex: 0,
        backgroundImageIndex: 0,
        characterPosition: 'center',
        memo: memoDeafult,
    },
    {
        index: 1,
        deviceId: 2,
        characterId: null,
        faceIndex: 0,
        backgroundImageIndex: 0,
        characterPosition: 'center',
        memo: memoDeafult,
    },
    {
        index: 2,
        deviceId: 3,
        characterId: null,
        faceIndex: 0,
        backgroundImageIndex: 0,
        characterPosition: 'center',
        memo: memoDeafult,
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
        openFaceSettingModalNumber: null,
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

        openFaceSetting(devicePreviewItemIndex: number | null = null) {
            this.openFaceSettingModalNumber = devicePreviewItemIndex
        },

        closeFaceSetting() {
            this.openFaceSettingModalNumber = null
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

        setActiveFaceIndex(
            devicePreviewItemIndex: number,
            currentPage: number,
            perPage: number,
            index: number,
        ) {
            this.devicePreviewItems[devicePreviewItemIndex].faceIndex =
                (currentPage - 1) * perPage + index
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
        faceImagesDropdownItems(characterId: number): DropdownItem[] {
            let result: DropdownItem[] = []

            if (this.characterImages) {
                this.characterImages[characterId].forEach(
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
