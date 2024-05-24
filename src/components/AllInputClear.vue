<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Box from '@/components/Box.vue'
import Button from '@/components/Button.vue'
</script>

<template>
    <div class="AllInputClear">
        <Box>
            <p class="AllInputClear__title">入力内容を全消去</p>
            <ul class="AllInputClear__items">
                <li class="AllInputClear__item">
                    <Button
                        class="AllInputClear__button"
                        text="名前"
                        @click=""
                    />
                </li>
                <li class="AllInputClear__item">
                    <Button
                        class="AllInputClear__button"
                        text="台詞"
                        @click=""
                    />
                </li>
            </ul>
        </Box>
    </div>
</template>

<style lang="scss" scoped>
.AllInputClear {
    &__title {
        font-weight: bold;
        font-size: 16px;
        text-align: center;
    }

    &__items {
        display: flex;
        justify-content: center;
        column-gap: 12px;
        margin-top: 12px;
    }

    & &__button {
    }
}
</style>
