<template>
  <pre v-if="display.cookie_modal" class="h-fit w-full">{{ cookies.getAll() }}</pre>
  <div id="main_container" class="relative h-screen--35px flex flex-col bg-cafe-25 md:h-screen--50px md:flex-row-reverse">
    <LoginModal v-if="display.login_modal" />
    <div
      v-if="display.debug_modal" class="fixed left-0 top-0 z-50 h-full w-full bg-cafe-400 bg-opacity-50"
      @click="display.debug_modal = !display.debug_modal"
    >
      <DebugModal class="absolute left-1/12 top-1/12 h-3/4 w-3/4" :props="coffee_db" />
    </div>
    <div md="w-full" class="h-full flex items-center justify-center">
      <div class="relative h-full w-full">
        <FilterModal v-if="display.filter_modal" />
        <TheMap class="z-10" />
        <!-- <SearchBar v-if="!preferences.is_mobile" class="fixed left-1/2 top-1/8 z-20 w-[528px]" /> -->
      </div>
    </div>
    <div v-if="preferences.is_mobile" class="relative flex flex-col">
      <MobileList v-if="!display.filter_modal" class="absolute bottom-5 left-1/2 z-20 h-80 w-full -translate-x-1/2" />
    </div>
    <div v-else>
      <div class="flex flex-row overflow-hidden">
        <DesktopSidebar />
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
