<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'

interface Props {
    currentPage?: number
    totalItems: number
    perPage: number
}

const props = withDefaults(defineProps<Props>(), {
    currentPage: 1,
})

const emit = defineEmits(['update:page'])

const currentPage = ref(props.currentPage)
watch(
    () => props.currentPage,
    (newVal) => {
        currentPage.value = newVal
    },
)

const totalPage = ref(Math.ceil(props.totalItems / props.perPage))
watch([() => props.totalItems, () => props.perPage], () => {
    totalPage.value = Math.ceil(props.totalItems / props.perPage)
})

const changePage = (page: number) => {
    currentPage.value = page
    emit('update:page', page)
}
</script>

<template>
    <div class="Pagination">
        <ol class="Pagination__items">
            <li v-for="page in totalPage" :key="page" class="Pagination__item">
                <button
                    class="Pagination__itemButton"
                    :class="{
                        'Pagination__itemButton--active': page === currentPage,
                    }"
                    @click="changePage(page)"
                >
                    {{ page }}
                </button>
            </li>
        </ol>
    </div>
</template>

<style lang="scss" scoped>
.Pagination {
    background-color: #3f0e40;
    color: #fff;
    padding: 8px;
    display: flex;
    justify-content: center;

    &__items {
        display: flex;
        gap: 12px;
    }

    &__itemButton {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 40px;
        height: 40px;
        line-height: 1;
        border-radius: 2px;
        background-color: #fff;
        color: #111;
        border: 1px solid #111;
        cursor: pointer;

        &--active {
            font-weight: bold;
            background-color: yellow;
            cursor: default;
        }
    }
}
</style>
