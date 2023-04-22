<template>
  <LandingHeader />
  <section id="hero" class="font-red h-screen container">
    <div id="title" class="flex flex-col font-extrabold text-cafe-600 text-5xl">
      <span>Des espaces de travail inspirants</span>
      <span>Des connexions enrichissantes</span>
      <span>Du café.</span>
    </div>
    <div class="flex">
      <div id="text-col" class="w-1/2">
        <div id="sub-title" class="text-4xl">
          Kafo est le réseau qui redonne
          du goût au télétravail
        </div>
        <div id="sub-sub-title" class="">
          Notre plateforme facilite les rencontres pour les télétravailleurs en quête d'échanges et de collaborations.
        </div>
        <CTA />
      </div>
      <div class="relative">
        <img id="hero-pic" class="relative -right-30 -top-4" :src="hero_pic" style="width: 220%;">
      </div>
    </div>
  </section>
  <section id="hero" class="font-red h-screen text-xl container">
    <div class="">
      ZE BARDi
    </div>
  </section>
  <LandingFooter />
</template>

<script setup lang="ts">
import hero_pic from '@/assets/svg/equipe_5.svg'
</script>
