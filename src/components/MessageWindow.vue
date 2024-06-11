<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import Button from '@/components/Button.vue'
import Toast from '@/components/Toast.vue'

const store = useMainStore()
</script>

<template>
    <section class="MessageWindow">
        <h1 class="MessageWindow__heading">メッセージウインドウ</h1>
        <Button text="全コピ" color="gray" />
        <ol class="MessageWindow__items">
            <li
                class="MessageWindow__item"
                v-for="(item, index) in store.devicePreviewItems"
                :key="index"
            >
                <span class="MessageWindow__index">{{ index }}</span>
                <dl class="MessageWindow__detail">
                    <dt>
                        <input
                            class="MessageWindow__characterName"
                            :class="[
                                {
                                    'MessageWindow__characterName--focus':
                                        store.devicePreviewItems[index]
                                            .isCharacterNameFocus,
                                },
                            ]"
                            v-model="
                                store.devicePreviewItems[index].characterName
                            "
                            @focus="
                                store.devicePreviewItems[
                                    index
                                ].isCharacterNameFocus = true
                            "
                            @blur="
                                store.devicePreviewItems[
                                    index
                                ].isCharacterNameFocus = false
                            "
                        />
                    </dt>
                    <dd>
                        <textarea
                            class="MessageWindow__message"
                            :class="[
                                {
                                    'MessageWindow__message--focus':
                                        store.devicePreviewItems[index]
                                            .isMessageFocus,
                                },
                            ]"
                            v-model="store.devicePreviewItems[index].message"
                            @focus="
                                store.devicePreviewItems[index].isMessageFocus =
                                    true
                            "
                            @blur="
                                store.devicePreviewItems[index].isMessageFocus =
                                    false
                            "
                        ></textarea>
                    </dd>
                </dl>
            </li>
        </ol>

        <Toast />
    </section>
</template>

<style lang="scss" scoped>
.MessageWindow {
    &__items {
        display: flex;
        flex-direction: column;
        row-gap: 24px;
        margin-top: 12px;
    }

    &__item {
        display: flex;
        align-items: center;
        column-gap: 12px;
    }

    &__index {
        $size: 50px;
        width: $size;
        height: $size;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        background-color: #fff;
        color: #333;
        border: 3px solid #333;
        font-weight: bold;
        flex-shrink: 0;
    }

    &__detail {
        width: 100%;
        display: flex;
        flex-direction: column;
        row-gap: 6px;

        border-radius: 10px;
        padding: 16px;
        background: repeating-linear-gradient(
            -45deg,
            #f0f8ff,
            #f0f8ff 3px,
            #e9f4ff 3px,
            #e9f4ff 7px
        );
        border: solid 2px #6091d3;
        line-height: 1;
    }

    &__characterName,
    &__message {
        width: 100%;
        border-radius: 4px;
        border: solid 2px #6091d3;
        padding: 6px;
        font-size: 13px;

        &--focus {
            box-shadow: 0 0 12px red;
        }
    }

    &__message {
        line-height: 1.5;
    }
}
</style>
