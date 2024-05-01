<script setup lang="ts">
import Side from './components/Side.vue'
import Main from './components/Main.vue'

import { nextTick, onMounted, onUnmounted, ref } from 'vue'

const imageFiles = ref<string[]>([])

onMounted(async () => {
    imageFiles.value = await (window as any).ipcRenderer.invoke(
        'get-image-files',
    )
    console.log('imageFiles', imageFiles.value)
})

const appRef = ref<HTMLElement | null>(null)
const setWindowHeight = () => {
    if (appRef.value) {
        appRef.value.style.height = `${window.innerHeight}px`
    }
}
onMounted(async () => {
    await nextTick()
    setWindowHeight()
})
window.addEventListener('resize', setWindowHeight)
onUnmounted(() => {
    window.removeEventListener('resize', setWindowHeight)
})
</script>

<template>
    <div class="App" ref="appRef">
        <aside class="App__aside">
            <Side />
        </aside>
        <main class="App__main">
            <Main />
        </main>
    </div>
</template>

<style lang="scss" scoped>
.App {
    display: flex;
    background-color: #fff;
    height: 100vh;
    overflow: hidden;

    &__aside {
        flex-shrink: 0;
    }

    &__main {
        width: 100%;
    }
}
</style>
