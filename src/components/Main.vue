<script setup lang="ts">
import { getFilenameFromPath } from '@/utils'
import { useMainStore } from '@/stores/mainStore'

const store = useMainStore()
</script>

<template>
    <div class="Main">
        <div
            v-for="n in 2"
            style="
                background-color: #000;
                padding: 20px 50px;
                margin: 20px 0;
                font-size: 30px;
                color: #fff;
            "
        >
            あああ
        </div>
    </div>
</template>

<style lang="scss" scoped>
.Main {
    background-color: #fff;
}
</style>
