<script setup lang="ts">
import { getFilenameFromPath } from '../utils'
import { onMounted, ref } from 'vue'

const imageFiles = ref<string[]>([])

onMounted(async () => {
    imageFiles.value = await (window as any).ipcRenderer.invoke(
        'get-image-files',
    )
    console.log('imageFiles', imageFiles.value)
})
</script>

<template>
    <div class="Main">
        <ul>
            <li v-for="file in imageFiles" :key="file">
                <img :src="file" alt="" width="100%" />
                <br />
                {{ getFilenameFromPath(file) }}
            </li>
        </ul>
    </div>
</template>

<style scoped>
.Main {
    background-color: #fff;
}
</style>
