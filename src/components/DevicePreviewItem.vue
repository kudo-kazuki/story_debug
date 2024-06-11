<script setup lang="ts">
import { onMounted, onUnmounted, ref, computed, nextTick } from 'vue'
import { getFilenameFromPath } from '@/utils'
import {
    useMainStore,
    deviceItems,
    deviceDropDownItems,
    characterPositionItems,
} from '@/stores/mainStore'
import { DevicePreviewItemProps } from '@/types'
import BackgroundSetting from '@/components/BackgroundSetting.vue'
import CharacterSetting from '@/components/CharacterSetting.vue'
import FaceSetting from '@/components/FaceSetting.vue'
import Dropdown from '@/components/Dropdown.vue'
import RadioButtonGroup from '@/components/RadioButtonGroup.vue'
import device1 from '@/assets/devices/1.png'
import device2 from '@/assets/devices/2.png'
import device3 from '@/assets/devices/3.png'

const props = withDefaults(defineProps<DevicePreviewItemProps>(), {
    characterPosition: 'center',
})

const store = useMainStore()

const originWidth = 1476
const originHeight: number = 2624

const characterSpacer = 352 /*キャラクター画像の上下のスペース*/
const characterOriginSize = 1920

const getDeviceImage = computed(() => {
    switch (Number(store.devicePreviewItems[props.index].deviceId)) {
        case 1:
            return device1
        case 2:
            return device2
        case 3:
            return device3
    }
})

const rootRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const deviceAreaRef = ref<HTMLElement | null>(null)
const settingRef = ref<HTMLElement | null>(null)
const memoWrapRef = ref<HTMLElement | null>(null)
const characterAreaRef = ref<HTMLElement | null>(null)
const deviceImageRef = ref<HTMLElement | null>(null)
const characterImageRef = ref<HTMLElement | null>(null)

const characterImagePositionBottom = ref(0)

const setHeightDeviceArea = () => {
    if (
        !rootRef.value ||
        !headerRef.value ||
        !deviceAreaRef.value ||
        !settingRef.value ||
        !memoWrapRef.value
    ) {
        return
    }

    const style = window.getComputedStyle
    const headerHeight =
        headerRef.value.offsetHeight +
        parseInt(style(headerRef.value).marginBottom)
    const settingHeight =
        settingRef.value.offsetHeight +
        parseInt(style(settingRef.value).marginTop)
    const memoWrapHeight =
        memoWrapRef.value.offsetHeight +
        parseInt(style(memoWrapRef.value).marginTop)

    const totalHeight = headerHeight + settingHeight + memoWrapHeight

    deviceAreaRef.value.style.height = `${rootRef.value.offsetHeight - totalHeight}px`

    setTimeout(() => {
        if (!deviceImageRef.value || !characterAreaRef.value) {
            return
        }
        const width = parseFloat(getComputedStyle(deviceImageRef.value).width)
        const height = parseFloat(getComputedStyle(deviceImageRef.value).height)
        characterAreaRef.value.style.width = `${width}px`

        const nowHeightRate = height / originHeight
        const nowSpacerLength = characterSpacer * 2 * nowHeightRate
        characterImagePositionBottom.value = nowSpacerLength / 2

        if (characterImageRef.value) {
            characterImageRef.value.style.height = `${height - nowSpacerLength}px`
        }
    }, 400)
}

onMounted(async () => {
    await nextTick()
    setHeightDeviceArea()
    window.addEventListener('resize', setHeightDeviceArea)
})
onUnmounted(() => {
    window.removeEventListener('resize', setHeightDeviceArea)
})
</script>

<template>
    <section class="DevicePreviewItem" ref="rootRef">
        <div class="DevicePreviewItem__header" ref="headerRef">
            <span class="DevicePreviewItem__index">{{ index }}</span>
            <h1 class="DevicePreviewItem__deviceName">
                {{ deviceItems[deviceId].name }}
            </h1>
            <button
                class="DevicePreviewItem__deleteButton"
                @click="store.deleteDevicePreviewItem(index)"
            >
                ×
            </button>
        </div>
        <div class="DevicePreviewItem__deviceArea" ref="deviceAreaRef">
            <img
                class="DevicePreviewItem__backgroundImage"
                :src="
                    store.backgroundImages
                        ? store.backgroundImages[backgroundImageIndex]
                        : ''
                "
                alt=""
            />
            <img
                class="DevicePreviewItem__deviceImage"
                :src="getDeviceImage"
                alt=""
                ref="deviceImageRef"
            />

            <div
                class="DevicePreviewItem__characterArea"
                ref="characterAreaRef"
            >
                <div class="DevicePreviewItem__characterWrap">
                    <img
                        class="DevicePreviewItem__characterImage"
                        :class="[
                            `DevicePreviewItem__characterImage--${characterPosition}`,
                        ]"
                        :src="
                            store.characterImages && characterId !== null
                                ? store.characterImages[characterId]
                                : ''
                        "
                        :style="{
                            bottom: `${characterImagePositionBottom}px`,
                        }"
                        alt=""
                        ref="characterImageRef"
                    />
                </div>
            </div>
            <input
                class="DevicePreviewItem__characterName"
                :class="[
                    {
                        'DevicePreviewItem__characterName--focus':
                            store.devicePreviewItems[index]
                                .isCharacterNameFocus,
                    },
                ]"
                v-model="store.devicePreviewItems[index].characterName"
                @focus="
                    store.devicePreviewItems[index].isCharacterNameFocus = true
                "
                @blur="
                    store.devicePreviewItems[index].isCharacterNameFocus = false
                "
            />
            <textarea
                class="DevicePreviewItem__message"
                :class="[
                    {
                        'DevicePreviewItem__message--focus':
                            store.devicePreviewItems[index].isMessageFocus,
                    },
                ]"
                v-model="store.devicePreviewItems[index].message"
                @focus="store.devicePreviewItems[index].isMessageFocus = true"
                @blur="store.devicePreviewItems[index].isMessageFocus = false"
            ></textarea>
        </div>
        <div class="DevicePreviewItem__setting" ref="settingRef">
            <ul class="DevicePreviewItem__settingItems">
                <li>
                    <CharacterSetting :devicePreviewItemIndex="index" />
                </li>
                <li>
                    <FaceSetting :devicePreviewItemIndex="index" />
                </li>
                <li>
                    <BackgroundSetting :devicePreviewItemIndex="index" />
                </li>
                <li>
                    <Dropdown
                        :items="deviceDropDownItems"
                        v-model="store.devicePreviewItems[index].deviceId"
                    />
                </li>
                <li>
                    <RadioButtonGroup
                        :items="characterPositionItems"
                        v-model="
                            store.devicePreviewItems[index].characterPosition
                        "
                        :name="`characterPosition${index}`"
                    />
                </li>
            </ul>
        </div>
        <div class="DevicePreviewItem__memoWrap" ref="memoWrapRef">
            <textarea
                class="DevicePreviewItem__memo"
                v-model="store.devicePreviewItems[index].memo"
            ></textarea>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.DevicePreviewItem {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;

    &__header {
        position: relative;
        flex-shrink: 0;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 4px;
    }

    &__index {
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 1;
        $w: 48px;
        width: $w;
        height: $w;
        border-radius: 50%;
        background-color: #333;
        color: #fff;
        font-weight: bold;
        font-size: 32px;
        font-family: Arial;
    }

    &__index,
    &__deleteButton {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
    }

    &__deviceName {
        background-color: #eee;
        text-align: center;
        width: 100%;
        padding: 4px 0 6px;
        font-size: 24px;
        font-weight: normal;
    }

    &__deleteButton {
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        line-height: 1;
        $w: 48px;
        width: $w;
        height: $w;
        border-radius: 50%;
        background-color: #333;
        color: #fff;
        font-weight: bold;
        font-size: 32px;
        cursor: pointer;
        border: 1px solid purple;
        background-color: purple;

        &:hover {
            background-color: #fff;
            color: purple;
        }
    }

    &__deviceArea {
        position: relative;
        line-height: 0;
        height: 200px;
    }

    &__backgroundImage {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        z-index: 0;
    }

    &__deviceImage {
        position: relative;
        z-index: 1;
        height: 100%;
    }

    &__characterArea {
        position: absolute;
        top: 0;
        height: 100%;
        overflow: hidden;
    }

    &__characterWrap {
        position: relative;
        margin: 0 auto;
        width: 100%;
        height: 100%;
    }

    &__backgroundImage,
    &__deviceImage,
    &__characterArea {
        left: 50%;
        transform: translateX(-50%);
    }

    &__characterImage {
        position: absolute;
        bottom: 0;
        max-width: none;

        &--left {
            left: 0;
        }

        &--center {
            left: 50%;
            transform: translateX(-50%);
        }

        &--right {
            right: 0;
        }
    }

    &__characterName,
    &__message {
        position: absolute;
        bottom: 20%;
        left: 0;
        width: 100%;
        text-align: center;
        line-height: 1;
        font-size: 24px;
        font-weight: bold;
        z-index: 1;
        color: #fff;
        text-shadow: 1px 1px 0 rgba(0, 0, 0, 0.8);
        caret-color: red;
        background-color: transparent;
        border: none;

        &--focus {
            box-shadow: 0 0 12px red;
        }
    }

    &__setting {
        margin-top: 12px;
    }

    &__settingItems {
        display: flex;
        flex-direction: column;
        row-gap: 12px;
    }

    &__memoWrap {
        margin-top: 12px;
    }

    &__memo {
        width: 100%;
        height: 100px;
        min-height: 0;
        background-color: #f9f9f9;
        border: none;
        border-radius: 10px;
        padding: 16px;
        font-size: 14px;
    }
}
</style>
