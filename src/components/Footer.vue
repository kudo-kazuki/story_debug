<script setup lang="ts">
import { getFilenameFromPath } from '@/utils'
import { onMounted, ref } from 'vue'
import BackgroundSetting from '@/components/BackgroundSetting.vue'
import ConfirmModeSelect from '@/components/ConfirmModeSelect.vue'
import AllInputClear from '@/components/AllInputClear.vue'
import CharacterSelect from '@/components/CharacterSelect.vue'
import ClipBoardButton from '@/components/ClipBoardButton.vue'
</script>

<template>
    <div class="Footer">
        <ConfirmModeSelect class="Footer__ConfirmModeSelect" />
        <BackgroundSetting class="Footer__backgroundSetting" />
        <AllInputClear class="Footer__allInputClear" />
        <CharacterSelect class="Footer__characterSelect" />
        <ClipBoardButton class="Footer__clipBoardButton" />
    </div>
</template>

<style lang="scss" scoped>
.Footer {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #3f0e40;
    color: #fff;
    padding: 12px;
    column-gap: 12px;
}
</style>
