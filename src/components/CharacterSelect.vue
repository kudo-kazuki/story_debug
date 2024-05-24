<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import Box from '@/components/Box.vue'
import Button from '@/components/Button.vue'
import Dropdown from '@/components/Dropdown.vue'

const store = useMainStore()
</script>

<template>
    <div class="CharacterSelect">
        <Box class="CharacterSelect__box">
            <div class="CharacterSelect__left">
                <div class="CharacterSelect__selectWrap">
                    <Button
                        class="CharacterSelect__button"
                        text="キャラ選択"
                        @click=""
                    />
                    <Dropdown
                        class="CharacterSelect__dropdown"
                        :items="store.backgroundImagesDropdownItems"
                    />
                </div>
                <div class="CharacterSelect__selectWrap">
                    <Button
                        class="CharacterSelect__button"
                        text="表情選択"
                        @click=""
                    />
                    <Dropdown
                        class="CharacterSelect__dropdown"
                        :items="store.backgroundImagesDropdownItems"
                    />
                </div>
            </div>
            <div class="CharacterSelect__right">
                <p class="CharacterSelect__characterPositionTitle">
                    キャラ位置
                </p>
                <ul class="CharacterSelect__radioItems">
                    <li class="CharacterSelect__radioItem">
                        <label class="CharacterSelect__radioLabel"
                            ><input
                                class="CharacterSelect__radio"
                                type="radio"
                                name="characterPosition"
                            />左</label
                        >
                    </li>
                    <li class="CharacterSelect__radioItem">
                        <label class="CharacterSelect__radioLabel"
                            ><input
                                class="CharacterSelect__radio"
                                type="radio"
                                name="characterPosition"
                            />中央</label
                        >
                    </li>
                    <li class="CharacterSelect__radioItem">
                        <label class="CharacterSelect__radioLabel"
                            ><input
                                class="CharacterSelect__radio"
                                type="radio"
                                name="characterPosition"
                            />右</label
                        >
                    </li>
                </ul>
            </div>
        </Box>
    </div>
</template>

<style lang="scss" scoped>
.CharacterSelect {
    & &__box {
        display: flex;
        column-gap: 16px;
    }

    &__left {
        display: flex;
        flex-direction: column;
        row-gap: 12px;
    }

    &__selectWrap {
        display: flex;
        column-gap: 8px;
    }

    & &__button {
        width: 120px;
    }

    & &__dropdown {
        width: 250px;
    }

    &__characterPositionTitle {
        font-size: 16px;
        font-weight: bold;
    }
}
</style>
