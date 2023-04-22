<template>
  <LandingHeader />
  <section id="hero" class="overflow-hidden text-center md:text-left">
    <div class="font-red h-screen text-cafe-600 container">
      <div id="title" class="title-font flex flex-col">
        <span>Des espaces de travail inspirants</span>
        <span>Des connexions enrichissantes</span>
        <span>Du café.</span>
      </div>
      <div class="flex md:w-110%">
        <div id="text-col" class="mt-4 md:mt-10 md:w-2/3">
          <div class="overflow-visible">
            <img id="hero-pic-mobile" class="relative mx-auto max-w-500px w-90% md:hidden" :src="hero_pic">
          </div>
          <div id="sub-title" class="font-sub-title mt-6 md:mt-0">
            Kafo est le réseau qui redonne
            du goût au télétravail
          </div>
          <div id="sub-sub-title" class="mt-6 text-lg">
            Notre plateforme facilite les rencontres pour les télétravailleurs en quête d'échanges et de collaborations.
          </div>
          <CTA class="mx-auto mt-6 text-xl md:mt-12 sm:text-2xl md:text-3xl lg:text-4xl" />
        </div>
        <div class="overflow-visible">
          <img id="hero-pic" class="relative hidden md:block lg:-top-20 md:-top-10" :src="hero_pic">
        </div>
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

<style scoped>
.title-font {
  @apply text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold;
}

.font-sub-title {
  @apply text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold;
}
</style>
