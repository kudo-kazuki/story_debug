<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import Side from './components/Side.vue'
import Main from './components/Main.vue'

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
        height: 100%;
        overflow-y: auto;
    }

    &__main {
        width: 100%;
        height: 100%;
        overflow-y: auto;
    }
}
</style>
