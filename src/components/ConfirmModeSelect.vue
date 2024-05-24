<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Box from '@/components/Box.vue'
import Button from '@/components/Button.vue'
</script>

<template>
    <div class="ConfirmModeSelect">
        <Box>
            <p class="ConfirmModeSelect__title">確認モード</p>
            <ul class="ConfirmModeSelect__items">
                <li class="ConfirmModeSelect__item">
                    <Button
                        class="ConfirmModeSelect__button"
                        text="端末見え方"
                        @click=""
                    />
                </li>
                <li class="ConfirmModeSelect__item">
                    <Button
                        class="ConfirmModeSelect__button"
                        text="たくさん比較"
                        @click=""
                    />
                </li>
            </ul>
        </Box>
    </div>
</template>

<style lang="scss" scoped>
.ConfirmModeSelect {
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
        width: 100%;
    }
}
</style>
