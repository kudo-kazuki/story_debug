<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Button from '@/components/Button.vue'
import iconCamera from '@/assets/iconCamera.svg'
</script>

<template>
    <div class="ClipBoardButton">
        <Button
            class="ClipBoardButton__button"
            text="クリップボードにコピー"
            color="gray"
            :icon="iconCamera"
            @click=""
        />
    </div>
</template>

<style lang="scss" scoped>
.ClipBoardButton {
    & &__button {
    }
}
</style>
