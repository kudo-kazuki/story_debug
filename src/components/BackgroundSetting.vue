<script setup lang="ts">
import { getFilenameFromPath } from '@/utils'
import { useMainStore } from '@/stores/mainStore'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'

const store = useMainStore()
</script>

<template>
    <div class="BackgroundSetting">
        <div>
            背景画像：<Button
                text="aaa"
                @click="store.openBackgroundSetting()"
            />
        </div>
        <Modal
            :isShow="store.isOpenBackgroundSetting"
            title="背景画像設定"
            @close="store.closeBackgroundSetting"
        >
            <template #body>aaaa</template>
            <!-- <template #footer></template> -->
        </Modal>
    </div>
</template>

<style lang="scss" scoped>
.BackgroundSetting {
}
</style>
