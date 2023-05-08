<template>
  <div class="ml-2 h-screen--50px w-90 fill-current fill-grass-500">
    <div class="my-3 flex flex-col gap-4">
      <!-- <div v-for="place in place_db" :key="place.id" class="relative mx-2 overflow-hidden rounded-xl shadow-md">
        <PlaceCard :place="place" />
      </div> -->
      <div v-bind="containerProps" class="h-200vh w-fit">
        <div v-bind="wrapperProps" class="flex flex-col gap-3">
          <div v-for="item in list" :key="item.data.id" class="w-86">
            <PlaceCard :place="item.data" class="relative rounded-xl shadow-md" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVirtualList } from '@vueuse/core'

const place_store = use_place_store()
const place_db = computed(() => place_store.db_filtered)
const { list, containerProps, wrapperProps } = useVirtualList(
  place_db, { itemHeight: 300 },
)
</script>
