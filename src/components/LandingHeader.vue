<template>
  <header class="sticky top-0 z-40 w-full bg-cafe-50/50 text-xs font-medium text-cafe-500 backdrop-blur md:text-lg">
    <div class="mx-auto h-5px max-w-7xl flex flex-row place-items-center justify-between md:h-80px">
      <RouterLink class="icon-btn" to="/">
        <img :src="logo" alt="logo" class="ml-2 h-7 object-contain sm:ml-4 xl:ml-0 md:h-12 sm:h-9">
      </RouterLink>
      <div class="flex gap-12">
        <nav class="h-full flex cursor-pointer place-self-center gap-12 md:gap-5">
          <div @click="scrollTo('faq')">
            FAQ
          </div>
          <div @click="scrollTo('contact')">
            Contact
          </div>
          <!-- <RouterLink to="/a-propos">
            A Propos
          </RouterLink> -->
        </nav>
        <nav>
          <LandingCTA class="mr-2 px-2 sm:mr-4 xl:mr-0 md:px-4 sm:px-3" />
        </nav>
      </div>
    </div>
    <!-- <div class="h-4 backdrop-blur-sm" /> -->
  </header>
</template>

<script setup lang="ts">
import logo from '@/assets/img/logo/kafo_logo_medium_dark.png'

function scrollTo(id: string) {
  const el = document.getElementById(id)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>
