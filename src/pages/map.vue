<template>
  <pre v-if="display.cookie_modal" class="h-fit w-full">{{ cookies.getAll() }}</pre>
  <div id="main_container" class="relative h-screen--35px flex flex-col bg-cafe-25 md:h-screen--50px md:flex-row-reverse">
    <WelcomeModal v-if="stored_display.welcome_modal" />
    <LoginModal v-if="display.login_modal" />
    <div md="w-full" class="h-full flex items-center justify-center">
      <div class="relative h-full w-full">
        <FilterModal v-if="display.filter_modal" />
        <TheMap class="z-10" />
        <SearchBar v-if="!preferences.is_mobile" class="fixed left-1/2 top-1/8 z-20 w-[528px]" />
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
const place_db = computed(() => use_place_store().db_filtered)

watch(place_db, () => {
  use_map_store().update_markers(place_db, useRouter())
}, { immediate: true })
</script>
