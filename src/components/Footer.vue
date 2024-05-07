<script setup lang="ts">
import { getFilenameFromPath } from '@/utils'
import { onMounted, ref } from 'vue'
import BackgroundSetting from '@/components/BackgroundSetting.vue'
</script>

<template>
    <div class="Footer">
        <BackgroundSetting />
    </div>
</template>

<style lang="scss" scoped>
.Footer {
    background-color: #3f0e40;
    color: #fff;
    padding: 8px;
}
</style>
