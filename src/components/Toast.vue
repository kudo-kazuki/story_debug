<script setup lang="ts">
import { computed } from 'vue'

interface Props {
    text: string
    color?: 'blue' | 'green' | 'gray' | 'red' | 'orange'
    icon?: string
    x: number
    y: number
}

const props = withDefaults(defineProps<Props>(), {
    color: 'green',
})
</script>

<template>
    <div class="Toast" :class="[`Toast--${color}`]">
        <img v-if="icon" class="Toast__icon" :src="icon" alt="" />
        {{ text }}
    </div>
</template>

<style lang="scss" scoped>
$color-styles: (
    'blue': (
        'color': #fff,
        'background-color': blue,
        'hover-color': #fff,
        'hover-background-color': blue,
    ),
    'green': (
        'color': #fff,
        'background-color': #111,
        'hover-color': #fff,
        'hover-background-color': #111,
    ),
    'red': (
        'color': #111,
        'background-color': #eee,
        'hover-color': #fff,
        'hover-background-color': #bbb,
    ),
);

.Toast {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999999;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    padding: 8px 12px;
    font-size: 14px;
    border: 3px solid #000;
}
</style>
