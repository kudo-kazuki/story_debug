<script setup lang="ts">
import { computed } from 'vue'
import { getFilenameFromPath } from '@/utils'
import { useMainStore } from '@/stores/mainStore'
import DevicePreviewItem from '@/components/DevicePreviewItem.vue'

const store = useMainStore()

const itemWidth = 500
const width = computed(() => {
    return {
        width: `${store.devicePreviewItems.length * (itemWidth + 24)}px`,
    }
})
console.log('devicePreviewItems:', store.devicePreviewItems)
</script>

<template>
    <div class="DevicePreview">
        <ol
            class="DevicePreview__items"
            :style="{ '--item-width': itemWidth + 'px', ...width }"
        >
            <li
                class="DevicePreview__item"
                v-for="(item, index) in store.devicePreviewItems"
                :key="index"
            >
                <DevicePreviewItem v-bind="item" :index="index" />
            </li>
        </ol>
    </div>
</template>

<style lang="scss" scoped>
.DevicePreview {
    height: 100%;
    overflow-x: scroll;

    &__items {
        display: flex;
        height: 100%;
        column-gap: 24px;
    }

    &__item {
        width: var(--item-width);
        height: 100%;
    }
}
</style>
