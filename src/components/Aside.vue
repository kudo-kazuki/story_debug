<script setup lang="ts">
import { getFilenameFromPath } from '@/utils'
import { onMounted, ref } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import Button from '@/components/Button.vue'
import MessageWindow from '@/components/MessageWindow.vue'

const store = useMainStore()
</script>

<template>
    <div class="Aside">
        <div class="Aside__header"></div>
        <div class="Aside__inner">
            <MessageWindow />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.Aside {
    display: flex;
    flex-direction: column;
    width: 400px;
    background-color: #3f0e40;
    color: #fff;
    padding: 12px 0 12px 12px;
    overflow: hidden;
    height: 100%;
    box-shadow: -30px 3px 31px rgba(34, 0, 32, 0.8) inset;

    &__header {
        flex-shrink: 0;
    }

    &__inner {
        height: 100%;
        overflow-y: scroll;
        padding: 0 12px 0 0;
        margin-top: 12px;
        padding-top: 12px;
        border-top: 1px solid #fff;
    }

    &__heading {
        text-align: center;
        font-size: 16px;
        margin-bottom: 12px;
    }
}
</style>
