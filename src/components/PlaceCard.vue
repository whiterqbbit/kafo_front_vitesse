<template>
  <div class="shadow-md">
    <div v-if="place.is_open" class="absolute right-4 top-3 z-10 inline-block rounded-full bg-grass-500 px-2 font-semibold tracking-wider text-white">
      Ouvert
    </div>
    <Galleria
      :value="place.aws_miniatures"
      :num-visible="3"
      :circular="true"
      container-style="overflow: hidden;"
      :show-item-navigators="true"
      :show-thumbnails="false"
      class="content-center"
    >
      <template #item="slotProps">
        <RouterLink :to="`place/${place.id}`" class="h-full w-full">
          <img
            :src="slotProps.item.url"
            class="block h-40 w-full rounded-xl object-cover object-cover"
            :alt="place.nom"
          >
        </RouterLink>
      </template>
    </Galleria>
    <RouterLink :to="`place/${place.id}`" class="relative flex flex-col place-self-center object-cover">
      <div class="flex flex-col gap-1 p-3">
        <!-- Ligne nom + type -->
        <div class="flex items-end justify-between">
          <span class="overflow-hidden text-ellipsis whitespace-nowrap text-left text-xl font-bold">
            {{ place.nom }}
          </span>
          <div>
            {{ place_store.establishment_type(place.tags) }}
          </div>
        </div>
        <!-- Ligne metro + tags -->
        <div class="flex justify-between gap-2">
          <div class="w-2/3 inline-flex gap-2">
            <img :src="subway_icon" class="h-6">
            <span class="overflow-hidden text-ellipsis whitespace-nowrap">{{ place.metro }}</span>
          </div>
          <TagList :tags="place.tags" class="inline-flex gap-2" />
        </div>
        <AvatarStack v-if="place.attendees" :attendees="place.attendees" />
      </div>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import type { Place } from '@/stores/xano.d.ts'
import subway_icon from '@/assets/img/icons/metro.png'

const props = defineProps<{
  place: Place
}>()

const place_store = use_place_store()
const place = ref(props.place)
</script>
