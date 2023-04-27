<template>
  <div class="tag_container" :class="props.tags.length < 6 ? 'md:max-w-1/2' : ''">
    <!-- prix -->
    <div v-if="props.tags.includes('Gratuit')" class="tag_group">
      <img class="tag_img" :src="svg_gratuit">
      <div class="tag_text">
        Gratuit
      </div>
    </div>
    <div v-else-if="props.tags.includes('Coworking')" class="tag_group">
      <img class="tag_img" :src="svg_payant">
      <div class="tag_text">
        Payant à l'heure
      </div>
    </div>
    <div v-else class="tag_group">
      <img class="tag_img" :src="svg_coffee">
      <div class="tag_text">
        Juste un café
      </div>
    </div>

    <!-- niveau de bruit  -->
    <div v-if="props.tags.includes('Studieux')" class="tag_group">
      <img class="tag_img" :src="svg_studieux">
      <div class="tag_text">
        Studieux
      </div>
    </div>
    <div v-else-if="props.tags.includes('Calme')" class="tag_group">
      <img class="tag_img" :src="svg_calme">
      <div class="tag_text">
        Calme
      </div>
    </div>
    <div v-else-if="props.tags.includes('Animé')" class="tag_group">
      <img class="tag_img" :src="svg_anime">
      <div class="tag_text">
        Animé
      </div>
    </div>

    <!-- wifi  -->
    <div v-if="props.tags.includes('Wifi')" class="tag_group">
      <img class="tag_img" :src="svg_wifi">
      <div class="tag_text">
        Wifi
      </div>
    </div>
    <div v-else class="tag_group">
      <img class="tag_img" :src="svg_wifi_no">
      <div class="tag_text">
        Pas de wifi
      </div>
    </div>

    <!-- prises  -->
    <div v-if="props.tags.includes('Prises')" class="tag_group">
      <img class="tag_img" :src="svg_plug">
      <div class="tag_text">
        Prises
      </div>
    </div>
    <div v-else class="tag_group">
      <img class="tag_img" :src="svg_plug_no">
      <div class="tag_text">
        Pas de prises
      </div>
    </div>

    <div v-if="props.tags.includes('Top rated')" class="tag_group">
      <img class="tag_img" :src="svg_fav">
      <div class="tag_text">
        Nos coup de coeur
      </div>
    </div>

    <div v-if="props.tags.includes('Salon de thé')" class="tag_group">
      <img class="tag_img" :src="svg_tea">
      <div class="tag_text">
        Salon de thé
      </div>
    </div>

    <div v-if="props.tags.includes('Alcool')" class="tag_group">
      <img class="tag_img" :src="svg_alcool">
      <div class="tag_text">
        Alcool
      </div>
    </div>

    <div v-if="props.tags.includes('Bon marché')" class="tag_group">
      <img class="tag_img" :src="svg_cheap">
      <div class="tag_text">
        Bon marché
      </div>
    </div>

    <div v-if="props.tags.includes('Abordable')" class="tag_group">
      <img class="tag_img" :src="svg_cheap">
      <div class="tag_text">
        Abordable
      </div>
    </div>

    <div v-if="props.tags.includes('Partenaire')" class="tag_group">
      <img class="tag_img" :src="svg_partner">
      <div class="tag_text">
        Partenaire
      </div>
    </div>
    <div v-if="props.tags.includes('Etage isolé')" class="tag_group">
      <img class="tag_img" :src="svg_upstairs">
      <div class="tag_text">
        Etage isolé
      </div>
    </div>

    <div v-if="props.tags.includes('Diner')" class="tag_group">
      <img class="tag_img" :src="svg_meal">
      <div class="tag_text">
        Diner
      </div>
    </div>

    <div v-if="props.tags.includes('Déjeuner')" class="tag_group">
      <img class="tag_img" :src="svg_meal">
      <div class="tag_text">
        Déjeuner
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import svg_payant from '@/assets/svg/icon/MaterialSymbolsAttachMoneyRounded.svg'
import svg_gratuit from '@/assets/svg/icon/MaterialSymbolsMoneyOffRounded.svg'
import svg_coffee from '@/assets/svg/icon/MaterialSymbolsCoffee.svg'
import svg_studieux from '@/assets/svg/icon/TablerVolumeOff.svg'
import svg_calme from '@/assets/svg/icon/TablerVolume2.svg'
import svg_anime from '@/assets/svg/icon/TablerVolume.svg'
import svg_wifi from '@/assets/svg/icon/MaterialSymbolsWifiRounded.svg'
import svg_wifi_no from '@/assets/svg/icon/MaterialSymbolsWifiOffRounded.svg'
import svg_plug from '@/assets/svg/icon/MaterialSymbolsPowerPlugRounded.svg'
import svg_plug_no from '@/assets/svg/icon/MaterialSymbolsPowerPlugOffRounded.svg'
import svg_fav from '@/assets/svg/icon/MaterialSymbolsFavorite.svg'
import svg_alcool from '@/assets/svg/icon/MdiGlassCocktail.svg'
import svg_cheap from '@/assets/svg/icon/MdiPiggyBank.svg'
import svg_tea from '@/assets/svg/icon/MdiTea.svg'
import svg_upstairs from '@/assets/svg/icon/MakiHome.svg'
import svg_partner from '@/assets/svg/icon/MdiHandshake.svg'
import svg_meal from '@/assets/svg/icon/IconParkSolidKnifeFork.svg'

const props = defineProps({
  tags: { type: Object, required: true },
})
</script>

<style>
.tag_container{
    @apply flex-wrap flex justify-between gap-y-5 my-5 gap-x-3
}

.tag_group{
    @apply flex flex-col flex-wrap place-items-center w-20 md:w-25 gap-1
}

.tag_img{
    @apply md:h-10
}

.tag_text{
    @apply text-center text-sm md:text-base md:text-xl
}
</style>
