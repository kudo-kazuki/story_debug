<script setup lang="ts">
import { computed } from 'vue'
import { getFilenameFromPath } from '@/utils'
import { useMainStore } from '@/stores/mainStore'
import DevicePreviewItem from '@/components/DevicePreviewItem.vue'

const store = useMainStore()

const width = computed(() => {
    return {
        width: `${store.devicePreviewItems.length * 492}px`,
    }
})
</script>

<template>
    <div class="DevicePreview">
        <ul class="DevicePreview__items" :style="width">
            <li
                class="DevicePreview__item"
                v-for="(item, index) in store.devicePreviewItems"
                :key="index"
            >
                <DevicePreviewItem v-bind="item" :index="index" />
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.DevicePreview {
    height: 100%;
    overflow-x: scroll;

    &__items {
        display: flex;
        height: 100%;
    }

    &__item {
        width: 492px;
        height: 100%;
    }
}
</style>
