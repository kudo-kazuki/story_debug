<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMainStore } from '@/stores/mainStore'

const store = useMainStore()
</script>

<template>
    <transition name="fade">
        <div v-if="store.isLoadingAnimation" class="Loading">
            <div class="loader"></div>
        </div>
    </transition>
</template>

<style lang="scss" scoped>
.Loading {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.7);
}

/* HTML: <div class="loader"></div> */
.loader {
    --d: 22px;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    color: #fff;
    box-shadow:
        calc(1 * var(--d)) calc(0 * var(--d)) 0 0,
        calc(0.707 * var(--d)) calc(0.707 * var(--d)) 0 1px,
        calc(0 * var(--d)) calc(1 * var(--d)) 0 2px,
        calc(-0.707 * var(--d)) calc(0.707 * var(--d)) 0 3px,
        calc(-1 * var(--d)) calc(0 * var(--d)) 0 4px,
        calc(-0.707 * var(--d)) calc(-0.707 * var(--d)) 0 5px,
        calc(0 * var(--d)) calc(-1 * var(--d)) 0 6px;
    animation: l27 1s infinite steps(8);
}
@keyframes l27 {
    100% {
        transform: rotate(1turn);
    }
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
    opacity: 1;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s;
}
</style>
