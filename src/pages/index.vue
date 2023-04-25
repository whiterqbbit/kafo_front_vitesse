<template>
  <DesktopHeader v-if="!preferences.is_mobile" />
  <MobileHeader v-else />
  <pre v-if="display.cookie_modal" h-fit w-full>{{ cookies.getAll() }}</pre>
  <div id="main_container" class="relative h-screen--35px flex flex-col bg-green-300 md:h-screen--50px md:flex-row-reverse">
    <div v-if="display.login_modal" class="fixed left-0 top-0 z-50 h-full w-full bg-cafe-400 bg-opacity-50">
      <LoginModal class="absolute left-1/4 top-1/6 h-1/4 w-1/2" />
    </div>
    <div
      v-if="display.debug_modal" class="fixed left-0 top-0 z-50 h-full w-full bg-cafe-400 bg-opacity-50"
      @click="display.debug_modal = !display.debug_modal"
    >
      <DebugModal class="absolute left-1/12 top-1/12 h-3/4 w-3/4" :props="coffee_db" />
    </div>
    <div md="w-full" class="overflow-none h-full flex items-center justify-center bg-red-100 font-title">
      <div class="relative h-full w-full">
        <TheMap class="z-10" />
        <SearchBar class="fixed left-1/2 top-1/8 z-20 w-[528px]" />
      </div>
    </div>
    <MobileList
      v-if="preferences.is_mobile"
      class="absolute bottom-0 left-1/2 z-20 h-80 w-full font-title -translate-x-1/2"
    />
    <div v-else class="h-full">
      <div class="flex flex-row overflow-hidden bg-[#faf7f7] font-title">
        <FilterModal v-if="display.filter_modal" class="w-150" />
        <div v-else class="ml-2 mt-4 w-16 place-items-center p-1">
          <div class="h-fit flex place-items-center place-self-center rounded-xl bg-white p-2 shadow-md" @click="display.filter_modal = true">
            <button i-fa6-solid-sliders class="h-10" />
          </div>
        </div>
        <DesktopList class="h-screen--50px w-120 overflow-auto" />
      </div>
    </div>
    <TheFooter
      v-if="preferences.is_mobile"
      class="fixed bottom-0 z-50 h-56px w-full rounded-t-xl"
    />
  </div>
</template>

<script setup lang="ts">
import { useCookies } from '@vueuse/integrations/useCookies'

const coffee_db = computed(() => use_coffee_store().db_filtered)
const mapStore = use_map_store()

watch(coffee_db, () => {
  mapStore.updateMarkers(coffee_db)
}, { immediate: true })

const cookies = useCookies(['user'])
</script>
