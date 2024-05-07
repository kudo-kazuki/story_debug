<script setup lang="ts">
interface Props {
    text: string
    color?: 'blue' | 'black' | 'gray' | 'red' | 'orange'
    size?: 'l' | 'm' | 's'
    isActive?: boolean
    isDisabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    color: 'black',
    size: 's',
})
</script>

<template>
    <button
        class="Button"
        :class="[
            `Button--${color}`,
            `Button--${size}`,
            { 'Button--active': isActive, 'Button--disabled': isDisabled },
        ]"
    >
        {{ text }}
    </button>
</template>

<style lang="scss" scoped>
.Button {
    color: #fff;
    padding: 8px 12px;
    font-size: 14px;
    border-radius: 8px;
    border: none;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }

    &--black {
        background-color: #222;
    }
}
</style>
