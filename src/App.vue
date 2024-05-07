<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import Footer from '@/components/Footer.vue'
import Main from '@/components/Main.vue'

const store = useMainStore()

const appRef = ref<HTMLElement | null>(null)
const setWindowHeight = () => {
    if (appRef.value) {
        appRef.value.style.height = `${window.innerHeight}px`
    }
}
onMounted(async () => {
    const backgroundImages = await (window as any).ipcRenderer.invoke(
        'get-background-images',
    )
    store.setBackgroundImages(backgroundImages)

    const emoticonImages = await (window as any).ipcRenderer.invoke(
        'get-emotion-images',
    )
    store.setEmoticonImages(emoticonImages)

    const characterImages = await (window as any).ipcRenderer.invoke(
        'get-character-images',
    )
    store.setCharacterImages(characterImages)

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
        <main class="App__main">
            <Main />
        </main>
        <footer class="App__footer">
            <Footer />
        </footer>
    </div>
</template>

<style lang="scss" scoped>
.App {
    display: flex;
    flex-direction: column;
    background-color: #fff;
    height: 100vh;
    overflow: hidden;

    &__footer {
        flex-shrink: 0;
        width: 100%;
    }

    &__main {
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }
}
</style>
