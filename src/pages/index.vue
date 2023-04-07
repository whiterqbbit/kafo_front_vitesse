<template>
  <div id="main_container" h-screen--35px flex flex-col bg-green-300 md="h-screen--50px flex-row-reverse">
    <div md="w-full" h-full flex items-center justify-center bg-red-100 font-title>
      <div class="text-center">
        MAP
      </div>
    </div>
    <StoreTester class="absolute h-1/2 w-90" />
    <div w-full flex overflow-auto bg-blue-200 font-title md="max-w-600px">
      <div
        absolute bottom-50px h-80 w-70 overflow-auto bg-blue-100 font-title md:hidden
        class="left-1/2 -translate-x-1/2"
      >
        LISTE MOBILE
      </div>
      <div hidden w-full overflow-auto bg-blue-100 font-title md="block">
        LISTE DESKTOP
      </div>
    </div>
    <div h-56px md="hidden">
      <TheFooter h-full rounded-t-xl />
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
