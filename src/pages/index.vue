<template>
  <div id="main_container" h-screen--35px flex flex-col bg-green-300 md="h-screen--50px flex-row-reverse">
    <div md="w-full" h-full flex items-center justify-center bg-red-100 font-title>
      <div class="h-full w-full text-center">
        <TheMap />
        <MapMarker
          v-for="coffee in coffee_db"
          :key="coffee.id"
          :lng-lat="coffee.location.data"
          :popup-description="coffee.desc"
        />
      </div>
    </div>
    <div w-full flex overflow-auto bg-blue-200 font-title md="max-w-600px">
      <div
        absolute bottom-50px h-80 w-70 overflow-auto bg-blue-100 font-title md:hidden
        class="left-1/2 -translate-x-1/2"
      >
        LISTE MOBILE
      </div>
      <div hidden w-full overflow-auto bg-cafe-100 md="block">
        <div v-show="!display.selected_modal">
          <DesktopList />
        </div>
        <div v-show="display.selected_modal">
          <CoffeeModal />
        </div>
      </div>
    </div>
    <div h-56px md="hidden">
      <TheFooter h-full rounded-t-xl />
    </div>
  </div>
</template>

<script setup lang="ts">
import { use_coffee_store } from '@/stores/coffee'

const coffee_db = computed(() => use_coffee_store().db)
</script>
