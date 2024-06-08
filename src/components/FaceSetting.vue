<script setup lang="ts">
import { onMounted, ref, computed, watch, nextTick } from 'vue'
import { DropdownItem } from '@/types'
import { getFilenameFromPath } from '@/utils'
import { useMainStore } from '@/stores/mainStore'
import Button from '@/components/Button.vue'
import Dropdown from '@/components/Dropdown.vue'
import Modal from '@/components/Modal.vue'
import Pagination from '@/components/Pagination.vue'

const store = useMainStore()

interface Props {
    devicePreviewItemIndex: number
}

const props = withDefaults(defineProps<Props>(), {})

const activeCharacterId = ref<string | number | null>(
    store.devicePreviewItems[props.devicePreviewItemIndex]?.characterId,
)

watch(
    [
        () => props.devicePreviewItemIndex,
        () =>
            store.devicePreviewItems[props.devicePreviewItemIndex]?.characterId,
    ],
    ([newIndex, newCharacterId]) => {
        activeCharacterId.value = newCharacterId
    },
    { immediate: true },
)

const faceImagesDropdownItems = computed(() => {
    let result: DropdownItem[] = []

    if (store.faceImages && activeCharacterId.value) {
        store.faceImages[activeCharacterId.value].forEach((image, index) => {
            result.push({
                value: index,
                text: getFilenameFromPath(image),
            })
        })
    }

    return result
})

const PER_PAGE = 30
const currentPage = ref(1)
const displayFaceImages = computed(() => {
    const start = (currentPage.value - 1) * PER_PAGE
    const end = start + PER_PAGE
    return (store.faceImages?.[activeCharacterId.value ?? ''] ?? []).slice(
        start,
        end,
    )
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
    displayFaceImages,
    async (newImages) => {
        // 全ての画像が読み込まれるのを待つ
        await Promise.all(newImages.map(loadImage))

        await nextTick()
        store.hideLoadingAnimation()
    },
    { immediate: true },
)
</script>

<template>
    <div class="FaceSetting">
        <div class="FaceSetting__form">
            <Button
                class="FaceSetting__button"
                text="表情選択"
                @click="store.openFaceSetting(devicePreviewItemIndex)"
            />
            <Dropdown
                :items="faceImagesDropdownItems"
                v-model="
                    store.devicePreviewItems[devicePreviewItemIndex].faceIndex
                "
            />
        </div>

        <Modal
            :isShow="
                store.openFaceSettingModalNumber === devicePreviewItemIndex
            "
            title="表情選択"
            @close="store.closeFaceSetting"
        >
            <template #body>
                <ul class="FaceSetting__items">
                    <li
                        v-for="(item, index) in displayFaceImages"
                        :key="index"
                        class="FaceSetting__item"
                        :class="[
                            {
                                'FaceSetting__item--active':
                                    (currentPage - 1) * PER_PAGE + index ===
                                    store.devicePreviewItems[
                                        devicePreviewItemIndex
                                    ].faceIndex,
                            },
                        ]"
                    >
                        <button
                            class="FaceSetting__itemButton"
                            :class="[
                                {
                                    'FaceSetting__itemButton--active':
                                        (currentPage - 1) * PER_PAGE + index ===
                                        store.devicePreviewItems[
                                            devicePreviewItemIndex
                                        ].faceIndex,
                                },
                            ]"
                            @click="
                                store.setActiveFaceIndex(
                                    devicePreviewItemIndex,
                                    currentPage,
                                    PER_PAGE,
                                    index,
                                ),
                                    store.closeFaceSetting()
                            "
                        >
                            <img
                                class="FaceSetting__itemImage"
                                :src="item"
                                alt=""
                            />
                        </button>
                        <span
                            class="FaceSetting__itemName"
                            :class="[
                                {
                                    'FaceSetting__itemName--active':
                                        (currentPage - 1) * PER_PAGE + index ===
                                        store.devicePreviewItems[
                                            devicePreviewItemIndex
                                        ].faceIndex,
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
                    :totalItems="
                        store.faceImages
                            ? Object.keys(store.faceImages).length
                            : 0
                    "
                    :perPage="PER_PAGE"
                    @update:page="changePage"
                />
            </template>
        </Modal>
    </div>
</template>

<style lang="scss" scoped>
.FaceSetting {
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
