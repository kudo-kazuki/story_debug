<script setup lang="ts">
import { getFilenameFromPath } from '@/utils'
import { useMainStore } from '@/stores/mainStore'

const store = useMainStore()
</script>

<template>
    <div class="Main">
        <ul>
            <li v-for="file in store.backgroundImages" :key="file">
                <img :src="file" alt="" width="100%" />
                <br />
                {{ getFilenameFromPath(file) }}
            </li>
        </ul>
    </div>
</template>

<style lang="scss" scoped>
.Main {
    background-color: #fff;
}
</style>
