<script setup lang="ts">
import { getFilenameFromPath } from '@/utils'
import { useMainStore } from '@/stores/mainStore'
import DevicePreview from '@/components/DevicePreview.vue'

const store = useMainStore()
</script>

<template>
    <div class="Main">
        <DevicePreview />
    </div>
</template>

<style lang="scss" scoped>
.Main {
    background-color: #fff;
    height: 100%;
    overflow: hidden;
    padding: 12px;
}
</style>
