<template>
  <div>
    <div v-if="coffee_store.coffee_db_loading">
      <img :src="spinner" m-auto>
    </div>
    <div v-else-if="coffee_store.coffee_db_error">
      {{ coffee_store.coffee_db_error }}
    </div>
    <div v-else-if="coffee_store.coffee_db">
      <div v-for="(coffee, index) in coffee_store.coffee_db" :key="index">
        <div class="m-4 h-48 flex rounded-xl bg-cafe-300">
          <div>
            <Galleria
              :value="coffee.aws_miniatures"
              :num-visible="3"
              :circular="true"
              container-style="width: 340px;"
              :show-item-navigators="true"
              :show-thumbnails="false"
            >
              <template #item="slotProps">
                <img
                  :src="slotProps.item.url"
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
              <div v-for="(tag, tag_index) in coffee.tags" :key="tag_index" class="text-sm">
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
import Galleria from 'primevue/galleria'
import subway_icon from '@/assets/img/icons/metro_tantative.png'
import spinner from '@/assets/img/spinner.gif'
const coffee_store = use_coffee_store()
</script>
