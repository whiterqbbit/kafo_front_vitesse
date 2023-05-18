<template>
  <div>
    <h2>{{ props.place.nom }}</h2>
    <div ref="sortable_container" class="flex">
      <div
        v-for="pic in place_pics"
        :key="pic.url"
        class="flex flex-col"
      >
        <img :src="close_icon" class="w-8 cursor-not-allowed" @click="erase(pic)">
        <img :src="pic.url" class="w-48 cursor-pointer">
      </div>
      <hr>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSortable } from '@vueuse/integrations/useSortable'
import type { MaybeRefOrGetter } from '@vueuse/core'
import close_icon from '@/assets/img/icons/metro.png'
import type { Place } from '@/stores/xano.d.ts'

const props = defineProps<{
  place: Place
}>()

const place_pics = ref(props.place.aws_pics)
const sortable_container = ref<HTMLElement | null>(null)

useSortable(sortable_container as MaybeRefOrGetter<HTMLElement | null | undefined>, place_pics)

function erase(pic: { url: string }) {
  console.log('erase', pic)
  place_pics.value = place_pics.value.filter(p => p.url !== pic.url)
}
</script>
