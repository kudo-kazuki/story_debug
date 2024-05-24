<script setup lang="ts">
interface Props {
    text: string
    color?: 'blue' | 'black' | 'gray' | 'red' | 'orange'
    size?: 'l' | 'm' | 's'
    isActive?: boolean
    isDisabled?: boolean
    icon?: string
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
        <img v-if="icon" class="Button__icon" :src="icon" alt="" />
        {{ text }}
    </button>
</template>

<style lang="scss" scoped>
$size-styles: (
    'l': (
        'fonst-size': 32px,
        'padding': 16px 24px,
    ),
    'm': (
        'fonst-size': 20px,
        'padding': 12px 20px,
    ),
    's': (
        'fonst-size': 14px,
        'padding': 8px 12px,
    ),
);

$color-styles: (
    'blue': (
        'color': #fff,
        'background-color': blue,
        'hover-color': #fff,
        'hover-background-color': blue,
    ),
    'black': (
        'color': #fff,
        'background-color': #111,
        'hover-color': #fff,
        'hover-background-color': #111,
    ),
    'gray': (
        'color': #111,
        'background-color': #eee,
        'hover-color': #fff,
        'hover-background-color': #bbb,
    ),
);

.Button {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    padding: 8px 12px;
    font-size: 14px;
    border-radius: 6px;
    border: none;
    cursor: pointer;

    &:hover {
        opacity: 0.9;
    }

    @each $size, $style in $size-styles {
        &--#{$size} {
            font-size: map-get($style, 'font-size');
            padding: map-get($style, 'padding');
        }
    }

    @each $color, $style in $color-styles {
        &--#{$color} {
            color: map-get($style, 'color');
            background-color: map-get($style, 'background-color');

            &:hover {
                color: map-get($style, 'hover-color');
                background-color: map-get($style, 'hover-background-color');
            }
        }
    }

    &__icon {
        width: 24px;
        height: 24px;
        margin-right: 8px;
    }
}
</style>
