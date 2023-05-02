<template>
  <div id="main_container" class="z-20 w-150 overflow-auto rounded-r-3xl bg-cafe-25 p-4 text-2xl md:h-fit">
    <div id="top-bar" class="mb-2 flex justify-between">
      <div class="flex gap-4 rounded-2xl px-4">
        <a class="text-4xl font-bold">Filtres</a>
      </div>
      <div class="flex gap-4">
        <input id="init" value="Réinitialiser" type="button" class="btn-light" @click="reset_filters()">
        <div class="h-fit flex place-items-center place-self-center rounded-full bg-white p-1 shadow-md" @click="display.filter_modal = false">
          <button i-ci-chevron-left-duo class="hidden md:block" />
        </div>
      </div>
    </div>
    <div id="filter_container" class="flex flex-col gap-4 text-left">
      <!-- FILTRE TARIFS -->
      <section>
        <div class="filter-container gap-1">
          Tarification
          <div class="filter-container-inner">
            <div class="w-1/3 flex gap-2">
              <Checkbox v-model="filters.pricing_free" class="mt-2px" :binary="true" />
              <div class="flex flex-col">
                <label for="filter-coworking" class="cursor-pointer" @click="filters.pricing_free = !filters.pricing_free">Gratuit</label>
                <div class="description">
                  Accès libre et illimité
                </div>
              </div>
            </div>
            <div class="w-1/3 flex gap-2">
              <Checkbox v-model="filters.pricing_coffee" class="mt-2px" :binary="true" />
              <div class="flex flex-col">
                <label for="filter-coworking" class="cursor-pointer" @click="filters.pricing_coffee = !filters.pricing_coffee">A la conso</label>
                <div class="description">
                  Il suffit d'un café pour travailler !
                </div>
              </div>
            </div>
            <div class="w-1/3 flex gap-2">
              <Checkbox v-model="filters.pricing_hourly" class="mt-2px" :binary="true" />
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
          Ambiance
          <div class="filter-container-inner">
            <div class="w-1/3 flex gap-2">
              <Checkbox v-model="filters.noise_level_silent" class="mt-3px" :binary="true" />
              <div class="flex flex-col">
                <label for="filter-coworking" class="cursor-pointer" @click="filters.noise_level_silent = !filters.noise_level_silent">Studieux</label>
                <div class="description">
                  Silence garanti, pour un travail efficace
                </div>
              </div>
            </div>
            <div class="w-1/3 flex gap-2">
              <Checkbox v-model="filters.noise_level_calm" class="mt-3px" :binary="true" />
              <div class="flex flex-col">
                <label for="filter-coworking" class="cursor-pointer" @click="filters.noise_level_calm = !filters.noise_level_calm">Calme</label>
                <div class="description">
                  Niveau sonore contenu, bavardages et calls discrets autorisés
                </div>
              </div>
            </div>
            <div class="w-1/3 flex gap-2">
              <Checkbox v-model="filters.noise_level_lively" class="mt-3px" :binary="true" />
              <div class="flex flex-col">
                <label for="filter-coworking" class="cursor-pointer" @click="filters.noise_level_lively = !filters.noise_level_lively">Animé</label>
                <div class="description">
                  Tout ce qui est plus fort yo
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FILTRE FRÉQUENTATION -->
      <!-- <section>
        <div class="filter-container flex">
          Fréquentation
          <div class="filter-container-inner flex-col">
            <div class="bullet">
              <Checkbox v-model="filters.not_empty" class="mt-1px" :binary="true" />
              <label for="filter_not_empty">N'est pas vide</label>
            </div>
            <MultiSelect
              v-model="filters.clubs_domain" :options="club_db_domain" filter display="chip" option-label="nom" placeholder="Filtrer par domaine"
              class="w-full md:w-20rem"
            />
            <MultiSelect
              v-model="filters.clubs_roles" :options="club_db_roles" filter display="chip" option-label="nom" placeholder="Filtrer par rôle"
              class="w-full md:w-20rem"
            />
            <MultiSelect
              v-model="filters.clubs_tech" :options="club_db_tech" filter display="chip" option-label="nom" placeholder="Filtrer par techno"
              class="w-full md:w-20rem"
            />
          </div>
        </div>
      </section> -->

      <!-- FILTRE DISTANCE -->
      <section>
        <div id="distance_filter" class="filter-container">
          <div class="flex justify-between">
            Près de vous
            <input id="init" value="Se localiser" type="button" class="btn-light" @click="reset_filters()">
          </div>
          <div class="mt-1 flex justify-around py-2 text-xl">
            <div class="bullet">
              <RadioButton v-model="filters.max_distance" input-id="filter_distance_none" :value="-1" />
              <label for="filter_distance_none" class="cursor-pointer" @click="filters.max_distance = -1">Partout</label>
            </div>
            <div class="bullet">
              <RadioButton v-model="filters.max_distance" input-id="filter_distance_1km" :value="1" />
              <label for="filter_distance_1km" class="cursor-pointer" @click="filters.max_distance = 1">1km</label>
            </div>
            <div class="bullet">
              <RadioButton v-model="filters.max_distance" input-id="filter_distance_2km" :value="2" />
              <label for="filter_distance_2km" class="cursor-pointer" @click="filters.max_distance = 2">2km</label>
            </div>
            <div class="bullet">
              <RadioButton v-model="filters.max_distance" input-id="filter_distance_5km" :value="5" />
              <label for="filter_distance_5km" class="cursor-pointer" @click="filters.max_distance = 5">5km</label>
            </div>
          </div>
        </div>
      </section>

      <!-- FILTRES AUTRES -->
      <section>
        <div id="misc_filters" class="filter-container flex flex-col">
          Autres
          <div class="filter-container-inner justify-around">
            <div class="flex flex-col gap-1">
              <div class="bullet">
                <Checkbox v-model="filters.our_picks" class="mt-3px" :binary="true" />
                <label class="cursor-pointer" for="filter_our_picks" @click="filters.our_picks = !filters.our_picks">Nos coups de coeurs</label>
              </div>
              <div class="bullet">
                <Checkbox v-model="filters.wifi" class="mt-3px" :binary="true" />
                <label class="cursor-pointer" for="filter_wifi" @click="filters.wifi = !filters.wifi">Wifi</label>
              </div>
              <div class="bullet">
                <Checkbox v-model="filters.power" class="mt-3px" :binary="true" />
                <label for="filter_power">Prises</label>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="bullet">
                <Checkbox v-model="filters.open_now" class="mt-3px" :binary="true" />
                <label class="cursor-pointer" for="filter_open" @click="filters.open_now = !filters.open_now">Ouvert actuellement</label>
              </div>
              <div class="bullet">
                <Checkbox v-model="filters.limit_to_map" class="mt-3px" :binary="true" />
                <label class="cursor-pointer" for="filter_limit_to_map" @click="filters.limit_to_map = !filters.limit_to_map">Limiter à la carte</label>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
const club_db_tech = computed(() => use_club_store().db?.filter(club => club.type === 'tech') ?? [])
const club_db_roles = computed(() => use_club_store().db?.filter(club => club.type === 'roles') ?? [])
const club_db_domain = computed(() => use_club_store().db?.filter(club => club.type === 'domain') ?? [])
</script>

<style scoped>
  .bullet {
    @apply flex flex-row gap-2 text-lg;
  }
  .description {
    @apply text-sm font-normal text-gray-400;
  }

  .filter-container {
    @apply flex flex-col px-4 py-3 bg-white rounded-2xl shadow-md;
  }

  .filter-container-inner{
    @apply flex gap-2 p-4 text-xl
  }
</style>
