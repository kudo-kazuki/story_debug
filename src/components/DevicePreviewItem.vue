<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { getFilenameFromPath } from '@/utils'
import { useMainStore, deviceItems } from '@/stores/mainStore'
import { DevicePreviewItemProps } from '@/types'
import BackgroundSetting from '@/components/BackgroundSetting.vue'
import CharacterSetting from '@/components/CharacterSetting.vue'
import FaceSetting from '@/components/FaceSetting.vue'
import device1 from '@/assets/devices/1.png'
import device2 from '@/assets/devices/2.png'
import device3 from '@/assets/devices/3.png'

const props = withDefaults(defineProps<DevicePreviewItemProps>(), {
    position: 'center',
})

const store = useMainStore()

const originWidth = 1476
const originHeight = 2624

const getDeviceImage = computed(() => {
    switch (props.deviceId) {
        case 1:
            return device1
        case 2:
            return device2
        case 3:
            return device3
    }
})
</script>

<template>
    <section class="DevicePreviewItem">
        <div class="DevicePreviewItem__header">
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
        <div class="DevicePreviewItem__deviceArea">
            <img
                class="DevicePreviewItem__backgroundImage"
                :src="
                    store.backgroundImages
                        ? store.backgroundImages[backgroundImageIndex]
                        : ''
                "
            />
            <img class="DevicePreviewItem__deviceImage" :src="getDeviceImage" />
        </div>
        <div class="DevicePreviewItem__setting">
            <ul>
                <li>
                    <CharacterSetting :devicePreviewItemIndex="index" />
                </li>
                <li>
                    <FaceSetting :devicePreviewItemIndex="index" />
                </li>
                <li>
                    <BackgroundSetting :devicePreviewItemIndex="index" />
                </li>
            </ul>
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
}
</style>
