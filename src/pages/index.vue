<template>
  <pre v-if="display.cookie_modal" h-fit w-full>{{ cookies.getAll() }}</pre>
  <div id="main_container" h-screen--35px flex flex-col bg-green-300 md="h-screen--50px flex-row-reverse">
    <div v-if="display.login_modal" class="fixed left-0 top-0 z-50 h-full w-full bg-cafe-400 bg-opacity-50">
      <LoginModal class="absolute left-1/4 top-1/6 h-1/4 w-1/2" />
    </div>
    <div
      v-if="display.debug_modal" class="fixed left-0 top-0 z-50 h-full w-full bg-cafe-400 bg-opacity-50"
      @click="display.debug_modal = !display.debug_modal"
    >
      <DebugModal class="absolute left-1/12 top-1/12 h-3/4 w-3/4" :props="coffee_db" />
    </div>
    <div md="w-full" h-full flex items-center justify-center bg-red-100 font-title>
      <div class="relative h-full w-full">
        <TheMap class="z-10" />
        <SearchBar class="fixed left-1/2 top-1/8 z-20 w-[528px]" />
        <MapMarker
          v-for="coffee in coffee_db" :key="coffee.id" :lng-lat="coffee.location.data"
          :popup-description="coffee.desc"
        />
      </div>
    </div>
    <div w-142 flex overflow-auto bg-blue-200 font-title md="max-w-600px">
      <MobileList
        class="absolute bottom-0 left-1/2 z-20 h-80 w-full overflow-auto font-title md:hidden -translate-x-1/2"
      />
      <div hidden w-full overflow-auto bg-cafe-100 md="block">
        <div v-show="!display.selected_modal">
          <DesktopList />
        </div>
        <div v-show="display.selected_modal">
          <CoffeeModal />
        </div>
      </div>
    </div>
    <div fixed bottom-0 z-50 h-56px w-full md="hidden">
      <TheFooter class="h-full rounded-t-xl" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCookies } from '@vueuse/integrations/useCookies'
import { use_coffee_store } from '@/stores/coffee'

const cookies = useCookies(['user'])

const coffee_db = computed(() => use_coffee_store().db)
</script>
