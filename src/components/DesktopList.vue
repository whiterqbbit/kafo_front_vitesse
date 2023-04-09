<template>
  <div>
    <div v-if="coffee_store.db_loading">
      <img :src="spinner" m-auto>
    </div>
    <div v-else-if="coffee_store.db_error">
      {{ coffee_store.db_error }}
    </div>
    <div v-else-if="coffee_store.db">
      <div v-for="(coffee) in coffee_store.db" :key="coffee.id" class="overflow-hidden">
        <div class="relative mx-2 my-1 h-48 flex cursor-pointer rounded-xl bg-cafe-100 shadow-[3px_3px_0px_-0px_rgba(80,59,52,1)]" hover="translate-x-2px translate-y-2px transition shadow-none" @click="select_coffee(coffee.id)">
          <div>
            <div v-if="coffee.is_open" class="absolute left-66 top-3 z-10 inline-block rounded-full bg-grass-500 px-2 py-1 text-sm font-bold tracking-wider text-cafe-100 text-white">
              Ouvert
            </div>
            <Galleria
              :value="coffee.aws_miniatures"
              :num-visible="3"
              :circular="true"
              container-style="width: 340px; max-width: 340px; overflow: hidden;"
              :show-item-navigators="true"
              :show-thumbnails="false"
            >
              <template #item="slotProps">
                <img
                  :src="slotProps.item.url"
                  class="rounded-xl"
                  :alt="coffee.nom"
                  style="width: 100%; max-height: 12rem; display: block; object-fit: cover;"
                >
              </template>
            </Galleria>
          </div>
          <div flex flex-col gap-2 p-2 text-left>
            <div class="text-2xl font-bold">
              {{ coffee.nom }}
            </div>
            <div class="flex gap-2 text-sm">
              <img :src="subway_icon" class="h-6">
              {{ coffee.metro }}
            </div>
            <div id="tags" flex flex-wrap gap-1>
              <div v-for="(tag, tag_index) in coffee.tags" :key="tag_index" class="tag">
                {{ tag }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import subway_icon from '@/assets/img/icons/metro_tantative.png'
import spinner from '@/assets/img/spinner.gif'

const coffee_store = use_coffee_store()

function select_coffee(id: number) {
  coffee_store.selected_id = id
  display.selected_modal = true
}
</script>
