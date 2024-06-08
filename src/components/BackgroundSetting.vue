<script setup lang="ts">
import { onMounted, ref, computed, watch, nextTick } from 'vue'
import { getFilenameFromPath } from '@/utils'
import { useMainStore } from '@/stores/mainStore'
import { BackgroundSettingProps } from '@/types'
import Button from '@/components/Button.vue'
import Dropdown from '@/components/Dropdown.vue'
import Modal from '@/components/Modal.vue'
import Pagination from '@/components/Pagination.vue'

const store = useMainStore()

const props = withDefaults(defineProps<BackgroundSettingProps>(), {})

const PER_PAGE = 30
const currentPage = ref(1)
const displayBackgroundImages = computed(() => {
    const start = (currentPage.value - 1) * PER_PAGE
    const end = start + PER_PAGE
    return (store.backgroundImages ?? []).slice(start, end)
})

const changePage = async (page: number) => {
    if (page === currentPage.value) {
        return false
    }

    store.showLoadingAnimation()

    await nextTick()

    setTimeout(() => {
        currentPage.value = page
    }, 100)
}

const loadImage = (url: string) => {
    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = url

        if (img.complete) {
            resolve(img)
        } else {
            img.addEventListener('load', () => resolve(img))
        }
    })
}

watch(
    displayBackgroundImages,
    async (newImages) => {
        // 全ての画像が読み込まれるのを待つ
        await Promise.all(newImages.map(loadImage))

        await nextTick()
        store.hideLoadingAnimation()
    },
    { immediate: true },
)

console.log('devicePreviewItemIndex', props.devicePreviewItemIndex)
</script>

<template>
    <div class="BackgroundSetting">
        <div class="BackgroundSetting__form">
            <Button
                class="BackgroundSetting__button"
                text="背景選択"
                @click="store.openBackgroundSetting(devicePreviewItemIndex)"
            />
            <Dropdown
                :items="store.backgroundImagesDropdownItems"
                v-model="
                    store.devicePreviewItems[devicePreviewItemIndex]
                        .backgroundImageIndex
                "
            />
        </div>

        <Modal
            :isShow="
                store.openBackgroundSettingModalNumber ===
                devicePreviewItemIndex
            "
            title="背景画像設定"
            @close="store.closeBackgroundSetting"
        >
            <template #body>
                <ul class="BackgroundSetting__items">
                    <li
                        v-for="(item, index) in displayBackgroundImages"
                        :key="index"
                        class="BackgroundSetting__item"
                        :class="[
                            {
                                'BackgroundSetting__item--active':
                                    (currentPage - 1) * PER_PAGE + index ===
                                    store.devicePreviewItems[
                                        devicePreviewItemIndex
                                    ].backgroundImageIndex,
                            },
                        ]"
                    >
                        <button
                            class="BackgroundSetting__itemButton"
                            :class="[
                                {
                                    'BackgroundSetting__itemButton--active':
                                        (currentPage - 1) * PER_PAGE + index ===
                                        store.devicePreviewItems[
                                            devicePreviewItemIndex
                                        ].backgroundImageIndex,
                                },
                            ]"
                            @click="
                                store.setActiveBackgroundIndex(
                                    devicePreviewItemIndex,
                                    currentPage,
                                    PER_PAGE,
                                    index,
                                ),
                                    store.closeBackgroundSetting()
                            "
                        >
                            <img
                                class="BackgroundSetting__itemImage"
                                :src="item"
                                alt=""
                            />
                        </button>
                        <span
                            class="BackgroundSetting__itemName"
                            :class="[
                                {
                                    'BackgroundSetting__itemName--active':
                                        (currentPage - 1) * PER_PAGE + index ===
                                        store.devicePreviewItems[
                                            devicePreviewItemIndex
                                        ].backgroundImageIndex,
                                },
                            ]"
                            >{{ getFilenameFromPath(item) }}</span
                        >
                    </li>
                </ul>
            </template>
            <template #footer>
                <Pagination
                    :currentPage="currentPage"
                    :totalItems="store.backgroundImages?.length || 0"
                    :perPage="PER_PAGE"
                    @update:page="changePage"
                />
            </template>
        </Modal>
    </div>
</template>

<style lang="scss" scoped>
.BackgroundSetting {
    &__title {
        font-weight: bold;
        font-size: 16px;
        text-align: center;
    }

    &__form {
        display: flex;
        align-items: center;
        justify-content: space-between;
        column-gap: 12px;
    }

    & &__button {
        width: 94px;
        flex-shrink: 0;
    }

    &__items {
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
    }

    &__item {
        line-height: 0;
        flex: 0 0 calc(10% - 12px);
    }

    &__itemButton {
        background-color: transparent;
        border-radius: 16px;
        overflow: hidden;
        padding: 0;
        cursor: pointer;
        border: 3px solid transparent;

        &:hover,
        &--active {
            border-color: red;
            box-shadow: 0 0 6px red;
        }
    }

    &__itemImage {
        width: 100%;
        border-radius: 16px;
    }

    &__itemName {
        display: block;
        text-align: center;
        font-size: 12px;
        margin-top: 6px;
        line-height: 1;

        &--active {
            font-weight: bold;
        }
    }
}
</style>
