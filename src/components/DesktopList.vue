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
        <div class="relative mx-2 my-1 h-126 flex flex-col cursor-pointer rounded-xl bg-cafe-100 btn-press" @click="select_coffee(coffee.id)">
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
                  style="width: 100%; height: 260px; display: block; object-fit: cover;"
                >
              </template>
            </Galleria>
          </div>
          <div flex flex-col gap-2 p-2 text-left>
            <div flex justify-between text-2xl>
              <div class="font-extrabold">
                {{ coffee.nom }}
              </div>
              <div>
                {{ establishment_type(coffee.tags) }}
              </div>
            </div>
            <div class="flex gap-2 text-lg">
              <img :src="subway_icon" class="h-6">
              {{ coffee.metro }}
            </div>
            <div id="tag_icons" flex gap-2>
              <div v-if="coffee.tags.includes('Studieux')" i-ci-volume-off class="icon-btn" />
              <div v-else-if="coffee.tags.includes('Calme')" i-ci-volume-min class="icon-btn" />
              <div v-else-if="coffee.tags.includes('Animé')" i-ci-volume-max class="icon-btn" />
              <div v-if="coffee.tags.includes('Wifi')" i-ci-wifi-high class="icon-btn" />
              <div v-else i-ci-wifi-off class="icon-btn" />
              <div v-if="coffee.tags.includes('Prises')" i-ic-round-power-off class="icon-btn" />
              <div v-else i-ic-round-power class="icon-btn" />
            </div>
          </div>
          <div v-if="coffee.attendance" id="attendance">
            <div class="flex px-2">
              <div v-for="attendee in coffee.attendees" :key="attendee.id" class="attendee-img h-12 w-12 rounded-full bg-cafe-100">
                <img :src="attendee.url" class="h-full w-full rounded-full object-cover">
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
const coffee_db = computed(() => coffee_store.db)
function select_coffee(id: number) {
  coffee_store.selected_id = id
  display.selected_modal = true
}

const establishment_type = computed(() => {
  const tagsList = [
    'Café',
    'Bar',
    'Bistrot',
    'Brasserie',
    'Hôtel',
    'Coworking',
    'Tiers lieu',
    'Autre lieu',
    'Restaurant',
    'Salon de thé',
  ]

  return (tags: any) => {
    for (const single_tag of tagsList) {
      if (tags.includes(single_tag))
        return single_tag
    }
    return ''
  }
})
</script>

<style scoped>
.attendee-img {
  position: relative;
  margin-right: -10px;
  z-index: 6;
}

.attendee-img:nth-child(n+2) {
  z-index: 5;
}

.attendee-img:nth-child(n+3) {
  z-index: 4;
}

.attendee-img:nth-child(n+4) {
  z-index: 3;
}

.attendee-img:nth-child(n+5) {
  z-index: 2;
}

.attendee-img:nth-child(n+6) {
  z-index: 1;
}
</style>
