<template>
  <div>
    <div v-if="coffee_store.db_loading">
      <img :src="spinner" m-auto>
    </div>
    <div v-else-if="coffee_store.db_error">
      {{ coffee_store.db_error }}
    </div>
    <div v-else-if="coffee_db">
      <div v-for="coffee in coffee_db.slice(0, 20)" :key="coffee.id" class="overflow-hidden">
        <div class="relative mx-2 my-1 h-48 flex cursor-pointer rounded-xl bg-cafe-100 btn-press">
          <div>
            <div v-if="coffee.is_open" class="absolute left-66 top-3 z-10 inline-block rounded-full bg-grass-500 px-2 py-1 font-bold tracking-wider text-cafe-100 text-white text-sm">
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
                <RouterLink :to="`coffee/${coffee.id}`">
                  <img
                    :src="slotProps.item.url"
                    class="rounded-xl"
                    :alt="coffee.nom"
                    style="width: 100%; max-height: 12rem; display: block; object-fit: cover;"
                    @click="select_coffee(coffee.id)"
                  >
                </RouterLink>
              </template>
            </Galleria>
          </div>
          <RouterLink :to="`coffee/${coffee.id}`">
            <div flex flex-col gap-2 p-2 text-left @click="select_coffee(coffee.id)">
              <div class="font-bold text-2xl">
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
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import subway_icon from '@/assets/img/icons/metro_tantative.png'
import spinner from '@/assets/img/spinner.gif'

const coffee_store = use_coffee_store()
const coffee_db = computed(() => coffee_store.db)
function select_coffee(id: number) {
  coffee_store.selected_id = id
}
</script>
