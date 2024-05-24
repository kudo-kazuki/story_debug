<script setup lang="ts">
interface Props {
    color?: 'purple' | 'blue' | 'black' | 'gray' | 'red' | 'orange'
}

const props = withDefaults(defineProps<Props>(), {
    color: 'purple',
})
</script>

<template>
    <div class="Box" :class="[`Box--${color}`]">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
$color-styles: (
    'purple': (
        'color': #fff,
        'background-color': #be4bc0,
        'border-color': #4b154c,
    ),
);

.Box {
    width: 100%;
    border-radius: 10px;
    padding: 16px;
    color: #111;

    @each $color, $style in $color-styles {
        &--#{$color} {
            color: map-get($style, 'color');
            background-color: map-get($style, 'background-color');
            border-color: map-get($style, 'border-color');
        }
    }
}
</style>
