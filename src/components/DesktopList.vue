<template>
  <div class="ml-2 h-screen--50px w-90 fill-current fill-grass-500">
    <ThreeDotsSpinner v-if="coffee_store.db_loading" class="m-auto h-full w-30 text-cafe-500" />
    <div v-else-if="coffee_store.db_error">
      {{ coffee_store.db_error }}
    </div>
    <div v-else-if="coffee_db" class="my-3 flex flex-col gap-4">
      <!-- <div v-for="coffee in coffee_db" :key="coffee.id" class="relative mx-2 overflow-hidden rounded-xl shadow-md">
        <CoffeeCard :place="coffee" />
      </div> -->
      <div v-bind="containerProps" class="h-200vh w-fit">
        <div v-bind="wrapperProps" class="flex flex-col gap-3">
          <div v-for="item in list" :key="item.index" class="w-86">
            <CoffeeCard :place="item.data" class="relative rounded-xl shadow-md" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useVirtualList } from '@vueuse/core'

const coffee_store = use_coffee_store()
const coffee_db = computed(() => coffee_store.db_filtered)
const { list, containerProps, wrapperProps } = useVirtualList(
  coffee_db,
  {
    itemHeight: 300,
  },
)
</script>
