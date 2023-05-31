<template>
  <div class="absolute left-0 top-0 z-20 max-h-screen--50px w-fit overflow-auto rounded-r-3xl p-4 backdrop-blur md:w-120">
    <div id="top-bar" class="mb-2 flex justify-between">
      <div class="flex gap-4">
        <a class="text-2xl font-bold text-cafe-700">Filtres</a>
      </div>
      <div class="flex gap-4">
        <input id="init" value="Réinitialiser" type="button" class="btn-light" @click="reset_filters()">
        <div class="h-fit flex place-items-center place-self-center rounded-full bg-white p-1 shadow-md" @click="display.filter_modal = false">
          <button i-ci-chevron-left-duo class="hidden md:block" />
        </div>
      </div>
    </div>
    <div id="filter-container" class="flex flex-col gap-2 text-left">
      <!-- FILTRES ESSENTIELS -->
      <section id="essentiels">
        <div class="filter-container">
          <span class="filter-modal-title">Essentiels</span>
          <div class="filter-container-inner text-sm">
            <div class="w-1/2 flex gap-2">
              <ACheckbox ref="filter-our-picks" v-model="filters.our_picks" class="filter-modal-checkbox" />
              <label for="filter-our-picks" class="cursor-pointer place-self-center" @click="filters.our_picks = !filters.our_picks">
                Coups de coeurs
              </label>
            </div>
            <div class="w-1/2 flex gap-2">
              <div class="bullet">
                <ACheckbox ref="filter-open" v-model="filters.open_now" class="filter-modal-checkbox" />
                <label for="filter-open" class="cursor-pointer place-self-center" @click="filters.open_now = !filters.open_now">
                  Ouvert actuellement
                </label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FILTRE TARIFICATION -->
      <section id="tarification">
        <div class="filter-container gap-1">
          <span class="filter-modal-title">Tarification</span>
          <div class="filter-container-inner">
            <!-- FILTRE GRATUIT DÉPRÉCIÉ -->
            <!-- <div class="w-1/3 flex gap-2">
              <ACheckbox v-model="filters.pricing_free" class="mt-2px"  />
              <div class="flex flex-col">
                <label for="filter-coworking" class="cursor-pointer" @click="filters.pricing_free = !filters.pricing_free">
                  Gratuit
                </label>
                <div class="description">
                  Accès libre et illimité
                </div>
              </div>
            </div> -->
            <div class="w-1/2 flex gap-2">
              <ACheckbox v-model="filters.pricing_place" class="filter-modal-checkbox" />
              <div class="flex flex-col">
                <label for="filter-coworking" class="cursor-pointer" @click="filters.pricing_place = !filters.pricing_place">A la conso</label>
                <div class="description">
                  Il suffit d'un café pour travailler !
                </div>
              </div>
            </div>
            <div class="w-1/2 flex gap-2">
              <ACheckbox v-model="filters.pricing_hourly" class="filter-modal-checkbox" />
              <div class="flex flex-col">
                <label for="filter-coworking" class="cursor-pointer" @click="filters.pricing_hourly = !filters.pricing_hourly">A l'heure</label>
                <div class="description">
                  Prix fixe par heure, consommation comprise
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FILTRE AMBIANCE -->
      <section>
        <div class="filter-container gap-1">
          <span class="filter-modal-title">Ambiance</span>
          <div class="filter-container-inner">
            <div class="w-1/3 flex gap-2">
              <ACheckbox ref="filter-coworking-silent" v-model="filters.noise_level_silent" class="filter-modal-checkbox" />
              <div class="flex flex-col">
                <label for="filter-coworking-silent" class="cursor-pointer" @click="filters.noise_level_silent = !filters.noise_level_silent">Studieux</label>
                <div class="description">
                  Silence garanti, pour un travail efficace
                </div>
              </div>
            </div>
            <div class="w-1/3 flex gap-2">
              <ACheckbox ref="filter-coworking-calm" v-model="filters.noise_level_calm" class="filter-modal-checkbox" />
              <div class="flex flex-col">
                <label for="filter-coworking-calm" class="cursor-pointer" @click="filters.noise_level_calm = !filters.noise_level_calm">Calme</label>
                <div class="description">
                  Niveau sonore contenu, bavardages et calls discrets autorisés
                </div>
              </div>
            </div>
            <div class="w-1/3 flex gap-2">
              <ACheckbox ref="filter-coworking-lively" v-model="filters.noise_level_lively" class="filter-modal-checkbox" />
              <div class="flex flex-col">
                <label for="filter-coworking-lively" class="cursor-pointer" @click="filters.noise_level_lively = !filters.noise_level_lively">Animé</label>
                <div class="description">
                  Tout ce qui est plus fort !
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FILTRE DISTANCE -->
      <section>
        <div id="distance_filter" class="filter-container">
          <div class="flex justify-between">
            <span class="filter-modal-title">Près de vous</span>
            <input id="init" value="Se localiser" type="button" class="btn-light" @click="use_map_store().locate_user()">
          </div>
          <div class="filter-container-inner justify-between">
            <div class="bullet" @click="filters.max_distance = -1">
              <ARadio ref="filter-distance-none" v-model="filters.max_distance" :value="-1" />
              <label for="filter-distance-none" class="cursor-pointer">Partout</label>
            </div>
            <div class="bullet" @click="filters.max_distance = 1">
              <ARadio ref="filter-distance-1km" v-model="filters.max_distance" :value="1" />
              <label for="filter-distance-1km" class="cursor-pointer">1km</label>
            </div>
            <div class="bullet" @click="filters.max_distance = 2">
              <ARadio ref="filter-distance-2km" v-model="filters.max_distance" :value="2" />
              <label for="filter-distance-2km" class="cursor-pointer">2km</label>
            </div>
            <div class="bullet" @click="filters.max_distance = 5">
              <ARadio ref="filter-distance-5km" v-model="filters.max_distance" :value="5" />
              <label for="filter-distance-5km" class="cursor-pointer">5km</label>
            </div>
          </div>
        </div>
      </section>

      <!-- FILTRES AUTRES -->
      <section>
        <div id="misc_filters" class="filter-container flex flex-col">
          <span class="filter-modal-title">Équipements</span>
          <div class="filter-container-inner justify-start gap-8">
            <div class="flex flex-col gap-1">
              <!-- <div class="bullet">
                <ACheckbox v-model="filters.limit_to_map" class="filter-modal-checkbox"  />
                <label class="cursor-pointer" for="filter-limit-to_map" @click="filters.limit_to_map = !filters.limit_to_map">Limiter à la carte</label>
              </div> -->
            </div>
            <div class="flex flex-col gap-1">
              <div class="bullet">
                <ACheckbox ref="filter-wifi" v-model="filters.wifi" class="filter-modal-checkbox" />
                <label class="cursor-pointer" for="filter-wifi" @click="filters.wifi = !filters.wifi">Wifi</label>
              </div>
              <div class="bullet">
                <ACheckbox ref="filter-power" v-model="filters.power" class="filter-modal-checkbox" />
                <label class="cursor-pointer" for="filter-power" @click="filters.power = !filters.power">Prises</label>
              </div>
              <div class="bullet">
                <ACheckbox ref="filter-floor" v-model="filters.floor" class="filter-modal-checkbox" />
                <label class="cursor-pointer" for="filter-floor" @click="filters.floor = !filters.floor">Étage isolé</label>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FILTRES CLUBS -->
      <section v-if="clubs.length">
        <div id="club_filters" class="filter-container flex flex-col">
          <span class="filter-modal-title">Fréquentation</span>
          <div class="filter-container-inner flex flex-col justify-between gap-2">
            <input v-model="search_input" type="text" class="w-full input-field" placeholder="Chercher un tag">
            <ClubList :search_input="search_input" />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const search_input = ref('')

const clubs = computed(() => use_club_store().db_filtered)

watch(() => filters.value.our_picks, () => {
  if (filters.value.our_picks) {
    reset_filters()
  }
})
</script>

<style scoped>
  .bullet {
    @apply flex flex-row gap-2;
  }
  .description {
    @apply text-xs font-normal text-gray-400;
  }

  .filter-container {
    @apply flex flex-col p-3 bg-white rounded-lg shadow-md;
  }

  .filter-container-inner{
    @apply flex p-2 gap-2
  }

  .filter-modal-title{
  @apply text-xl font-semibold text-cafe-700
  }

  .filter-modal-checkbox{
    @apply mt-3px place-self-start
  }
</style>
