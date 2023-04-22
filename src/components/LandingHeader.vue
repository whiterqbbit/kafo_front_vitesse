<template>
  <header class="sticky top-0 z-20 w-full bg-cafe-600 font-bold text-xs md:text-lg">
    <div class="mx-auto h-35px max-w-7xl flex flex-row place-items-center justify-between md:h-50px">
      <RouterLink class="icon-btn" to="/landing">
        <img :src="logo" alt="logo" class="ml-2 h-7 object-contain sm:ml-4 xl:ml-0 md:h-12 sm:h-9">
      </RouterLink>
      <nav class="flex gap-2 text-white md:gap-5">
        <RouterLink to="/FAQ">
          FAQ
        </RouterLink>
        <RouterLink to="/contact">
          Contact
        </RouterLink>
        <RouterLink to="/a-propos">
          A Propos
        </RouterLink>
      </nav>
      <nav>
        <RouterLink to="/">
          <CTA class="mr-2 px-2 sm:mr-4 xl:mr-0 md:px-4 sm:px-3" />
        </RouterLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import logo from '@/assets/img/logo/kafo_logo_white.png'
</script>
