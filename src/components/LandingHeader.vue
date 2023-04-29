<template>
  <header class="sticky top-0 z-40 w-full bg-cafe-600 text-xs font-bold md:text-lg">
    <div class="mx-auto h-35px max-w-7xl flex flex-row place-items-center justify-between md:h-50px">
      <RouterLink class="icon-btn" to="/">
        <img :src="logo" alt="logo" class="ml-2 h-7 object-contain sm:ml-4 xl:ml-0 md:h-12 sm:h-9">
      </RouterLink>
      <nav class="mb-1 h-full flex cursor-pointer items-center gap-2 text-white md:gap-5">
        <div @click="scrollTo('faq')">
          FAQ
        </div>
        <div @click="scrollTo('contact')">
          Contact
        </div>
        <RouterLink to="/a-propos">
          A Propos
        </RouterLink>
      </nav>
      <nav>
        <LandingCTA class="mr-2 px-2 sm:mr-4 xl:mr-0 md:px-4 sm:px-3" />
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import logo from '@/assets/img/logo/kafo_logo_white.png'

function scrollTo(id) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
