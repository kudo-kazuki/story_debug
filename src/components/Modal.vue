<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import Button from '@/components/Button.vue'

interface Props {
    title: string
    size?: 'l' | 'm' | 's'
    isShow?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    size: 'l',
})

const emit = defineEmits(['close'])

const close = () => {
    emit('close', false)
}
</script>

<template>
    <transition name="fade">
        <section v-if="isShow" class="Modal">
            <div class="Modal__overlay" @click="close()"></div>
            <div class="Modal__inner">
                <header class="Modal__header">
                    <h1>{{ title }}</h1>
                    <button class="Modal__closeButton" @click="close()">
                        ×
                    </button>
                </header>
                <main class="Modal__body">
                    <slot name="body" />
                </main>
                <footer class="Modal__footer">
                    <slot name="footer">
                        <Button text="×閉じる" color="gray" @click="close()" />
                    </slot>
                </footer>
            </div>
        </section>
    </transition>
</template>

<style lang="scss" scoped>
.Modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    padding: 24px;
    z-index: 9999;

    &__overlay {
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.6);
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

    &__inner {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-color: #fff;
        border-radius: 10px;
        box-shadow: 0 0 4px rgba(0, 0, 0, 0.4);
    }

    &__header {
        position: relative;
        text-align: center;
        padding: 12px 24px;
        border-bottom: 1px solid #ccc;

        h1 {
            font-size: 24px;
            line-height: 1.4;
            color: #111;
        }
    }

    &__closeButton {
        position: absolute;
        top: 50%;
        right: 24px;
        transform: translateY(-50%);
        background-color: #a01f46;
        border: 1px solid #a01f46;
        color: #fff;
        border-radius: 50%;
        transition:
            background-color 0.2s ease,
            color 0.2s ease;
        font-size: 16px;
        cursor: pointer;

        &:hover {
            background-color: #fff;
            color: #a01f46;
        }
    }

    &__body {
        height: 100%;
        overflow-y: auto;
        padding: 24px;
        color: #111;
    }

    &__footer {
        display: flex;
        justify-content: center;
        padding: 12px 24px;
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
