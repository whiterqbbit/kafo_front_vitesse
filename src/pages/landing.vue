<template>
  <LandingHeader />
  <section id="hero" class="overflow-hidden text-center md:text-left">
    <div class="font-red text-cafe-600 container">
      <div id="title" class="title-font flex flex-col">
        <span class="z-30">Des espaces de travail inspirants</span>
        <span class="z-30">Des connexions enrichissantes</span>
        <span class="z-30">Du café.</span>
      </div>
      <div class="flex md:w-110%">
        <div id="text-col" class="mt-4 md:mt-10 md:w-2/3">
          <div class="relative overflow-visible md:hidden">
            <div class="bg-floating-resize bg-shape absolute left-0 top-[-10px] z-0 bg-cafe-200" />
            <img id="hero-pic-mobile" class="relative mx-auto max-w-500px w-90%" :src="hero_pic">
          </div>
          <div id="sub-title" class="font-subtitle mt-6 md:mt-0">
            Kafo est le réseau qui redonne
            du goût au télétravail
          </div>
          <div id="sub-sub-title" class="z-10 mt-6 text-lg">
            Notre plateforme facilite les rencontres pour les télétravailleurs en quête d'échanges et de collaborations.
          </div>
          <CTA class="mx-auto mt-6 text-xl md:mt-12 sm:text-2xl md:text-3xl lg:text-4xl" />
        </div>
        <div class="relative overflow-visible">
          <div class="bg-floating-resize bg-shape absolute right-[50px] top-[-100px] z-0 hidden bg-cafe-200 md:block" />
          <img id="hero-pic" class="relative hidden md:block lg:-top-20 md:-top-10" :src="hero_pic">
        </div>
      </div>
    </div>
  </section>
  <section id="rencontres" class="font-red from-cafe-200 to-transparent from-50% bg-gradient-to-b text-center">
    <div class="mx-auto h-80 w-120 from-cafe-200 to-cafe-50 to-80% bg-gradient-to-t p-10">
      <div class="font-subtitle">
        Faites de nouvelles rencontres
      </div>
      <div class="mt-6 text-lg">
        Cassez la routine et travaillez dans une ambiance conviviale
      </div>
    </div>
    <div class="mx-auto max-w-250 flex flex flex-col justify-around gap-6 md:flex-row">
      <div class="card">
        <img :src="casque" class="w-15">
        <div>Explorez nos clubs</div>
        <div>
          Trouvez des personnes ayant les mêmes centres d'intérêt pour s'entraider, partager des
          connaissances et créer des opportunités de collaboration.
        </div>
      </div>
      <div class="card">
        <img :src="tasses" class="h-15 w-full">
        <div>Concentré ?</div>
        <div>Indiquez en un clic que vous ne souhaitez pas être dérangé.</div>
      </div>
      <div class="card">
        <img :src="table" class="h-15">
        <div>Après l’effort...</div>
        <div>
          Indiquez que vous êtes disponible après le travail pour manger un bout ou boire un verre.
        </div>
      </div>
    </div>
    <CTA class="mx-auto mt-6 text-lg md:mt-12 sm:text-xl md:text-2xl lg:text-3xl" />
  </section>
  <LandingFooter class="mt-20" />
</template>

<script setup lang="ts">
import hero_pic from '@/assets/svg/equipe_5.svg'
import casque from '@/assets/svg/casque.svg'
import tasses from '@/assets/svg/tasses.svg'
import table from '@/assets/svg/table.svg'
</script>

<style scoped>
.title-font {
  @apply text-xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold;
}

.font-subtitle {
  @apply text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold;
}

.card {
  @apply w-4/5 min-w-auto w-70 h-70 p-4 mx-auto bg-cafe-50 rounded-3xl;
}

.card>img {
  @apply mx-auto mb-4;
}

.card>div {
  @apply text-lg font-bold;
}

.card>div+div {
  @apply text-sm font-normal;
}

.bg-floating-resize {
  width: calc(100% - 40px);
  height: calc(100% - 40px);
}

.bg-shape {
  @apply rounded-tl-[439px] rounded-bl-[139px] rounded-tr-[139px];
}
</style>
