<script setup lang="ts">
import { RadioButtonGroupProps } from '@/types'

const props = withDefaults(defineProps<RadioButtonGroupProps>(), {})

const model = defineModel<number | string | null>({
    get: (value: number | string | null) => {
        return value
    },
    set: (value: number | string | null) => {
        return value
    },
})
</script>

<template>
    <ul class="RadioButtonGroup">
        <li
            v-for="item in items"
            :key="item.value"
            class="RadioButtonGroup__item"
        >
            <label class="RadioButtonGroup__label"
                ><input
                    class="RadioButtonGroup__radio"
                    type="radio"
                    :name="name"
                    :value="item.value"
                    v-model="model"
                /><span class="RadioButtonGroup__text">{{
                    item.text
                }}</span></label
            >
        </li>
    </ul>
</template>

<style lang="scss" scoped>
.RadioButtonGroup {
    width: 100%;
    display: flex;
    justify-content: center;
    column-gap: 12px;

    &__label {
        cursor: pointer;
    }
}
</style>
