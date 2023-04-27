<template>
  <div>
    <Flicking :options="{ renderOnlyVisible: true, resizeOnContentsReady: true }" class="flicking-container">
      <div v-for="coffee in coffee_store.db" :key="coffee.id" class="flicking-panel m-x-4 rounded-2xl bg-cafe-100">
        <RouterLink :to="`coffee/${coffee.id}`" class="flex flex-col place-self-center object-cover p-3">
          <img :src="coffee.aws_miniatures[0].url" class="h-50 rounded-xl">
          <div class="flex items-end justify-between">
            <span class="overflow-hidden text-ellipsis whitespace-nowrap text-left text-xl">{{ coffee.nom }}</span>
            <div class="font-normal">
              {{ coffee_store.establishment_type(coffee.tags) }}
            </div>
          </div>
          <div class="flex justify-between gap-2">
            <div class="w-75% inline-flex gap-2 text-left font-normal">
              <img :src="subway_icon" class="h-6">
              <span class="overflow-hidden text-ellipsis whitespace-nowrap">{{ coffee.metro }}</span>
            </div>
            <div class="flex">
              <div id="tag_icons" class="inline-flex gap-2">
                <div v-if="coffee.tags.includes('Studieux')" i-ci-volume-off class="icon-btn" />
                <div v-else-if="coffee.tags.includes('Calme')" i-ci-volume-min class="icon-btn" />
                <div v-else-if="coffee.tags.includes('Animé')" i-ci-volume-max class="icon-btn" />
                <div v-if="coffee.tags.includes('Wifi')" i-ci-wifi-high class="icon-btn" />
                <div v-else i-ci-wifi-off class="icon-btn" />
                <div v-if="coffee.tags.includes('Prises')" i-ic-round-power-off class="icon-btn" />
                <div v-else i-ic-round-power class="icon-btn" />
              </div>
            </div>
          </div>
          <div v-if="coffee.attendance" id="attendance">
            <div class="flex">
              <div v-for="attendee in coffee.attendees" :key="attendee.id" class="attendee-img h-12 w-12 rounded-full bg-cafe-100">
                <img :src="attendee.url" class="h-full w-full rounded-full object-cover">
              </div>
            </div>
          </div>
        </RouterLink>
      </div>
    </flicking>
  </div>
</template>

<script setup lang="ts">
import Flicking from '@egjs/vue3-flicking'
import subway_icon from '@/assets/img/icons/metro_tantative.png'

const coffee_store = use_coffee_store()
</script>

<style>
.flicking-container {
  display: flex;
  overflow: hidden;
  width: 100%;
  @apply
}

.flicking-panel {
  flex: none;
  width: 70%;
  height: 100%;
  @apply p-0
}
.flicking-camera {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    flex-direction: row;
    z-index: 1;
}
.flicking-viewport {
  margin-bottom: 10px;
}
.is-justify-content-center {
    justify-content: center!important;
}
.is-flex {
    display: flex!important;
}
.button {
    color: #3e8ed0;
    border:1px solid #3e8ed0;
    justify-content: center;
    padding: 10px;
    text-align: center;
    white-space: nowrap;
    border-radius: 3px;
    cursor: pointer;
}
.mr-2{
    margin-right: 5px;
}

.flicking-arrow-next, .flicking-arrow-prev {
    position: absolute;
    top: 50%;
    width: 64px;
    height: 64px;
    cursor: pointer;
    transform: translateY(-50%);
    z-index: 2;
}

.flicking-arrow-next {
    right: 10px;
}

.flicking-arrow-prev {
    left: 10px;
}
.flicking-arrow-next:after, .flicking-arrow-next:before, .flicking-arrow-prev:after, .flicking-arrow-prev:before {
    content: "";
    width: 24px;
    height: 6px;
    position: absolute;
    background-color: #f2a65e;

}
.flicking-arrow-prev:before {
    top: 50%;
    left: 22px;
    transform: rotate(-45deg);
    transform-origin: 0 50%;
}
.flicking-arrow-next:before {
    top: 50%;
    right: 22px;
    transform: rotate(45deg);
    transform-origin: 100% 50%;
}
.flicking-arrow-next.is-circle:after, .flicking-arrow-next.is-circle:before, .flicking-arrow-prev.is-circle:after, .flicking-arrow-prev.is-circle:before {
    background-color: #fff;
}
</style>
