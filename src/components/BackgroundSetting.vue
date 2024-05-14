<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { getFilenameFromPath } from '@/utils'
import { useMainStore } from '@/stores/mainStore'
import Button from '@/components/Button.vue'
import Modal from '@/components/Modal.vue'
import Pagination from '@/components/Pagination.vue'

const store = useMainStore()

const PER_PAGE = 30
const currentPage = ref(1)
const displayBackgroundImages = computed(() => {
    const start = (currentPage.value - 1) * PER_PAGE
    const end = start + PER_PAGE
    return (store.backgroundImages ?? []).slice(start, end)
})

const changePage = (page: number) => {
    currentPage.value = page
}
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
            <template #body>
                <ul class="BackgroundSetting__items">
                    <li
                        v-for="(item, index) in displayBackgroundImages"
                        :key="index"
                        class="BackgroundSetting__item"
                    >
                        <button class="BackgroundSetting__itemButton">
                            <img
                                class="BackgroundSetting__itemImage"
                                :src="item"
                                alt=""
                            />
                            <span class="BackgroundSetting__itemName">{{
                                getFilenameFromPath(item)
                            }}</span>
                        </button>
                    </li>
                </ul>
            </template>
            <template #footer>
                <Pagination
                    :currentPage="currentPage"
                    :totalItems="store.backgroundImages?.length"
                    :perPage="PER_PAGE"
                    @update:page="changePage"
                />
            </template>
        </Modal>
    </div>
</template>

<style lang="scss" scoped>
.BackgroundSetting {
    &__items {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

    &__item {
        line-height: 0;
        flex: 1 0 calc(10% - 12px);
    }

    &__itemImage {
        width: 100%;
    }

    &__itemName {
        text-align: center;
        font-size: 12px;
    }
}
</style>
