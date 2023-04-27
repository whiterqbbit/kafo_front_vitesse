<template>
  <div class="h-screen--50px w-120 overflow-auto">
    <div v-if="coffee_store.db_loading">
      <img :src="spinner" m-auto>
    </div>
    <div v-else-if="coffee_store.db_error">
      {{ coffee_store.db_error }}
    </div>
    <div v-else-if="coffee_db">
      <div v-for="coffee in coffee_db.slice(0, 20)" :key="coffee.id" class="overflow-hidden">
        <div class="relative mx-3 my-2 h-fit flex flex-col cursor-pointer rounded-xl bg-white btn-press" @click="select_coffee(coffee.id)">
          <div>
            <div v-if="coffee.is_open" class="absolute right-4 top-3 z-10 inline-block rounded-full bg-grass-500 px-2 py-1 font-bold tracking-wider text-white text-lg">
              Ouvert
            </div>
            <Galleria
              :value="coffee.aws_miniatures"
              :num-visible="3"
              :circular="true"
              container-style="overflow: hidden;"
              :show-item-navigators="true"
              :show-thumbnails="false"
              class="content-center"
            >
              <template #item="slotProps">
                <RouterLink :to="`coffee/${coffee.id}`" class="h-full w-full">
                  <img
                    :src="slotProps.item.url"
                    class="block h-300px max-h-12rem w-full rounded-xl object-cover object-cover"
                    :alt="coffee.nom"
                    @click="select_coffee(coffee.id)"
                  >
                </RouterLink>
              </template>
            </Galleria>
          </div>
          <RouterLink :to="`coffee/${coffee.id}`" class="flex flex-col gap-3 px-5 py-3">
            <div flex flex-col gap-2 text-left @click="select_coffee(coffee.id)">
              <div flex justify-between text-2xl>
                <div class="overflow-hidden text-ellipsis whitespace-nowrap">
                  {{ coffee.nom }}
                </div>
                <div class="font-normal text-xl">
                  {{ coffee_store.establishment_type(coffee.tags) }}
                </div>
              </div>
              <div class="flex justify-between">
                <div class="flex gap-2 overflow-inherit font-normal text-lg">
                  <img :src="subway_icon" class="m-auto h-6">
                  <div class="max-w-225px overflow-hidden text-ellipsis whitespace-nowrap">
                    {{ coffee.metro }}
                  </div>
                </div>
                <TagList :tags="coffee.tags" class="flex" />
              </div>
            </div>
            <AvatarStack v-if="coffee.attendees" :attendees="coffee.attendees" />
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import subway_icon from '@/assets/img/icons/metro.png'
import spinner from '@/assets/img/spinner.gif'

const coffee_store = use_coffee_store()
const coffee_db = computed(() => coffee_store.db_filtered)
function select_coffee(id: number) {
  coffee_store.selected_id = id
}
</script>
