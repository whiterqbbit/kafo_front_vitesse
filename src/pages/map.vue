<template>
  <pre v-if="display.cookie_modal" class="h-fit w-full">{{ cookies.getAll() }}</pre>
  <div id="main_container" class="relative h-screen--35px flex flex-col bg-[#faf7f7] md:h-screen--50px md:flex-row-reverse">
    <LoginModal v-if="display.login_modal" />
    <div
      v-if="display.debug_modal" class="fixed left-0 top-0 z-50 h-full w-full bg-cafe-400 bg-opacity-50"
      @click="display.debug_modal = !display.debug_modal"
    >
      <DebugModal class="absolute left-1/12 top-1/12 h-3/4 w-3/4" :props="coffee_db" />
    </div>
    <div md="w-full" class="overflow-none h-full flex items-center justify-center bg-red-100 font-title">
      <div class="relative h-full w-full">
        <TheMap class="z-10" />
        <!-- <SearchBar v-if="!preferences.is_mobile" class="fixed left-1/2 top-1/8 z-20 w-[528px]" /> -->
      </div>
    </div>
    <div v-if="preferences.is_mobile" class="flex flex-col">
      <FilterModal v-if="display.filter_modal" class="w-full font-title" />
      <MobileList v-else class="absolute bottom-20 left-1/2 z-20 h-80 w-full -translate-x-1/2" />
    </div>
    <div v-else class="h-full">
      <div class="flex flex-row overflow-hidden font-title">
        <FilterModal v-if="display.filter_modal" class="w-150" />
        <div v-else class="ml-2 mt-4 w-16 place-items-center p-1">
          <div class="h-fit flex place-items-center place-self-center rounded-xl bg-white p-2 shadow-md" @click="display.filter_modal = true">
            <button i-fa6-solid-sliders class="h-10" />
          </div>
        </div>
        <DesktopList />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCookies } from '@vueuse/integrations/useCookies'

const router = useRouter()

const coffee_db = computed(() => use_coffee_store().db_filtered)
const map_store = use_map_store()

// onMounted (() => {
//   map_store.update_markers(coffee_db, router)
// })

watch(coffee_db, () => {
  map_store.update_markers(coffee_db, router)
}, { immediate: true })

const cookies = useCookies(['user'])
</script>
