<script setup lang="ts">
import { DropdownProps } from '@/types'
import iconDown from '@/assets/iconDown.svg'

const props = withDefaults(defineProps<DropdownProps>(), {
    size: 's',
})

const model = defineModel<number | string>({
    get: (value: number | string) => {
        return value
    },
    set: (value: number | string) => {
        return value
    },
})
</script>

<template>
    <label class="Dropdown" :class="[`Dropdown--${size}`]">
        <select class="Dropdown__select" v-model="model">
            <option
                v-for="(item, index) in items"
                :value="item.value"
                :key="index"
            >
                {{ item.text }}
            </option>
        </select>
        <img class="Dropdown__icon" :src="iconDown" />
    </label>
</template>

<style lang="scss" scoped>
$size-styles: (
    'l': (
        'fonst-size': 32px,
        'padding': 16px 24px,
        'height': 40px,
    ),
    'm': (
        'fonst-size': 20px,
        'padding': 12px 20px,
        'height': 36px,
    ),
    's': (
        'fonst-size': 14px,
        'padding': 4px 12px,
        'height': 40px,
    ),
);

.Dropdown {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    cursor: pointer;

    &__select {
        width: 100%;
        background-color: #fff;
        border: 1px solid #111;
        -webkit-appearance: none;
        appearance: none;
        cursor: pointer;
        line-height: 1.8;
        border-radius: 4px;
        padding-right: 28px !important;
    }

    &__icon {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        right: 12px;
        width: 16px;
        height: 16px;
        pointer-events: none;
    }

    @each $size, $style in $size-styles {
        &--#{$size} &__select {
            font-size: map-get($style, 'font-size');
            padding: map-get($style, 'padding');
            height: map-get($style, 'height');
        }
    }
}
</style>
