<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { getFilenameFromPath } from '@/utils'
import { useMainStore, deviceItems } from '@/stores/mainStore'
import { DevicePreviewItemProps } from '@/types'
import BackgroundSetting from '@/components/BackgroundSetting.vue'
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

console.log('deviceItems', deviceItems)
</script>

<template>
    <section class="DevicePreviewItem">
        <div class="DevicePreviewItem__header">
            {{ index }}
            {{ deviceItems[deviceId].name }}
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
                    <BackgroundSetting />
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

    &__deviceArea {
        position: relative;
        line-height: 0;
    }

    &__backgroundImage {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 0;
    }

    &__deviceImage {
        position: relative;
        z-index: 1;
    }
}
</style>
