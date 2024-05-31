<script setup lang="ts">
import { onMounted, ref, computed, watch, nextTick } from 'vue'
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

const PER_PAGE = 30
const currentPage = ref(1)
const displayCharacterImages = computed(() => {
    const start = (currentPage.value - 1) * PER_PAGE
    const end = start + PER_PAGE

    if (store.characterImages) {
        return (Object.keys(store.characterImages) ?? []).slice(start, end)
    } else {
        return []
    }
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
    displayCharacterImages,
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
    <div class="CharacterSetting">
        <div class="CharacterSetting__form">
            <Button
                class="CharacterSetting__button"
                text="キャラ選択"
                @click="store.openCharacterSetting(devicePreviewItemIndex)"
            />
            <Dropdown
                :items="store.characterImagesDropdownItems"
                v-model="
                    store.devicePreviewItems[devicePreviewItemIndex].characterId
                "
            />
        </div>

        <Modal
            :isShow="
                store.openCharacterSettingModalNumber === devicePreviewItemIndex
            "
            title="キャラクター選択"
            @close="store.closeCharacterSetting"
        >
            <template #body>
                <ul class="CharacterSetting__items">
                    <li
                        v-for="(id, index) in displayCharacterImages"
                        :key="id"
                        class="CharacterSetting__item"
                        :class="[
                            {
                                'CharacterSetting__item--active':
                                    id ===
                                    store.devicePreviewItems[
                                        devicePreviewItemIndex
                                    ].characterId,
                            },
                        ]"
                    >
                        <button
                            class="CharacterSetting__itemButton"
                            :class="[
                                {
                                    'CharacterSetting__itemButton--active':
                                        id ===
                                        store.devicePreviewItems[
                                            devicePreviewItemIndex
                                        ].characterId,
                                },
                            ]"
                            @click="
                                store.setActiveCharacterId(
                                    devicePreviewItemIndex,
                                    id,
                                ),
                                    store.closeCharacterSetting()
                            "
                        >
                            <img
                                class="CharacterSetting__itemImage"
                                :src="
                                    store.characterImages
                                        ? store.characterImages[id]
                                        : ''
                                "
                                alt=""
                            />
                        </button>
                        <span
                            class="CharacterSetting__itemName"
                            :class="[
                                {
                                    'CharacterSetting__itemName--active':
                                        id ===
                                        store.devicePreviewItems[
                                            devicePreviewItemIndex
                                        ].characterId,
                                },
                            ]"
                            >{{
                                getFilenameFromPath(
                                    store.characterImages
                                        ? store.characterImages[id]
                                        : '',
                                )
                            }}</span
                        >
                    </li>
                </ul>
            </template>
            <template #footer>
                <Pagination
                    :currentPage="currentPage"
                    :totalItems="
                        store.characterImages
                            ? Object.keys(store.characterImages).length
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
.CharacterSetting {
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
        margin-top: 12px;
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
