<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import Aside from '@/components/Aside.vue'
import Main from '@/components/Main.vue'
import Loading from '@/components/Loading.vue'

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
    store.hideLoadingAnimation()
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
        <aside class="App__aside">
            <Aside />
        </aside>

        <Loading />
    </div>
</template>

<style lang="scss" scoped>
.App {
    display: flex;
    flex-direction: row-reverse;
    background-color: #fff;
    height: 100vh;
    overflow: hidden;

    &__aside {
        flex-shrink: 0;
    }

    &__main {
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
}
</style>
