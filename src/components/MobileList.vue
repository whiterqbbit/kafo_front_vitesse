<template>
  <div>
    <Flicking :options="{ renderOnlyVisible: true, resizeOnContentsReady: true }" class="flicking-container">
      <div v-for="coffee in coffee_store.db_filtered" :key="coffee.id" class="flicking-panel m-x-4 overflow-hidden rounded-2xl bg-cafe-100 shadow-md">
        <RouterLink :to="`coffee/${coffee.id}`" class="relative flex flex-col place-self-center object-cover">
          <img :src="coffee.aws_miniatures[0].url" class="h-50 object-cover">
          <div class="flex flex-col gap-1 p-3">
            <div v-if="coffee.is_open" class="absolute right-4 top-3 z-10 inline-block rounded-full bg-grass-500 px-2 py-1 font-bold tracking-wider text-white text-lg">
              Ouvert
            </div>

            <!-- Ligne nom + type -->
            <div class="flex items-end justify-between">
              <span class="overflow-hidden text-ellipsis whitespace-nowrap text-left font-bold text-xl">
                {{ coffee.nom }}
              </span>
              <div>
                {{ coffee_store.establishment_type(coffee.tags) }}
              </div>
            </div>

            <!-- Ligne metro + tags -->
            <div class="flex justify-between gap-2">
              <div class="w-3/4 inline-flex gap-2">
                <img :src="subway_icon" class="h-6">
                <span class="overflow-hidden text-ellipsis whitespace-nowrap">{{ coffee.metro }}</span>
              </div>
              <TagList :tags="coffee.tags" class="inline-flex gap-2" />
            </div>

            <AvatarStack v-if="coffee.attendees" :attendees="coffee.attendees" />
          </div>
        </RouterLink>
      </div>
    </flicking>
  </div>
</template>

<script setup lang="ts">
import Flicking from '@egjs/vue3-flicking'
import subway_icon from '@/assets/img/icons/metro.png'

const coffee_store = use_coffee_store()
</script>

<style>
.flicking-container {
  @apply flex w-full overflow-hidden
}

.flicking-panel {
  flex: none;
  @apply p-0 w-7/10 h-full
}
.flicking-camera {
    width: 100%;
    height: 100%;
    display: flex;
    position: relative;
    flex-direction: row;
    z-index: 1;
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
