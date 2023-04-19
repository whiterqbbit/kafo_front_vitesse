<template>
  <div id="main_container" class="p-4 text-2xl">
    <div id="top-bar" class="mb-2 flex justify-between">
      <div class="flex gap-4 rounded-2xl px-4">
        <a class="font-bold text-4xl">Filtres</a>
      </div>
      <div class="flex gap-4">
        <input id="init" value="Réinitialiser" type="button" class="btn-light" @click="filters.reset()">
        <div class="h-fit flex place-items-center place-self-center rounded-full bg-white p-1 shadow-md" @click="display.filter_modal = false">
          <button i-ci-chevron-left-duo />
        </div>
      </div>
    </div>
    <div id="filter_container" class="flex flex-col gap-4 text-left">
      <section>
        <div class="filter-container gap-1">
          Tarification
          <div class="filter-container-inner">
            <div class="w-1/3 flex gap-2">
              <Checkbox v-model="filters.pricing_free" class="mt-2px" :binary="true" />
              <div class="flex flex-col">
                <label for="filter-coworking">Gratuit</label>
                <div class="description">
                  si c pa magik ca
                </div>
              </div>
            </div>
            <div class="w-1/3 flex gap-2">
              <Checkbox v-model="filters.pricing_coffee" class="mt-2px" :binary="true" />
              <div class="flex flex-col">
                <label for="filter-coworking">A la conso</label>
                <div class="description">
                  Vous ne payez que ce que vous consommez !
                </div>
              </div>
            </div>
            <div class="w-1/3 flex gap-2">
              <Checkbox v-model="filters.pricing_hourly" class="mt-2px" :binary="true" />
              <div class="flex flex-col">
                <label for="filter-coworking">A l'heure</label>
                <div class="description">
                  Vous payez un prix fixe par heure, consommation comprise
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="filter-container gap-1">
          Ambiance
          <div class="filter-container-inner">
            <div class="w-1/3 flex gap-2">
              <Checkbox v-model="filters.noise_level_silent" class="mt-3px" :binary="true" />
              <div class="flex flex-col">
                <label for="filter-coworking">Studieux</label>
                <div class="description">
                  Atmosphère silencieuse, comme une bibliothèque.
                </div>
              </div>
            </div>
            <div class="w-1/3 flex gap-2">
              <Checkbox v-model="filters.noise_level_calm" class="mt-3px" :binary="true" />
              <div class="flex flex-col">
                <label for="filter-coworking">Calme</label>
                <div class="description">
                  Niveau sonore contenu, bavardages et calls discrets autorisés.
                </div>
              </div>
            </div>
            <div class="w-1/3 flex gap-2">
              <Checkbox v-model="filters.noise_level_lively" class="mt-3px" :binary="true" />
              <div class="flex flex-col">
                <label for="filter-coworking">Animé</label>
                <div class="description">
                  Tout ce qui est plus fort !
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div class="filter-container flex">
          Fréquentation
          <div class="filter-container-inner flex-col">
            <!-- <div class="bullet">
              <Checkbox v-model="filters.not_empty" class="mt-1px" :binary="true" />
              <label for="filter_not_empty">N'est pas vide</label>
            </div> -->
            <MultiSelect
              v-model="filters.clubs_domain" :options="club_db_domain" filter display="chip" option-label="nom" placeholder="Filtrer par domaine"
              class="w-full md:w-20rem"
            />
            <!-- <MultiSelect
              v-model="filters.clubs_roles" :options="club_db_roles" filter display="chip" option-label="nom" placeholder="Filtrer par rôle"
              class="w-full md:w-20rem"
            />
            <MultiSelect
              v-model="filters.clubs_tech" :options="club_db_tech" filter display="chip" option-label="nom" placeholder="Filtrer par techno"
              class="w-full md:w-20rem"
            /> -->
          </div>
        </div>
      </section>
      <section>
        <div id="distance_filter" class="filter-container">
          Proximité
          <div class="mt-1 flex justify-around py-2 text-xl">
            <div class="bullet">
              <RadioButton v-model="filters.max_distance" input-id="filter_distance_none" :value="null" />
              <label for="filter_distance_none">Tous</label>
            </div>
            <div class="bullet">
              <RadioButton v-model="filters.max_distance" input-id="filter_distance_1km" :value="1" />
              <label for="filter_distance_1km">1km</label>
            </div>
            <div class="bullet">
              <RadioButton v-model="filters.max_distance" input-id="filter_distance_2km" :value="2" />
              <label for="filter_distance_2km">2km</label>
            </div>
            <div class="bullet">
              <RadioButton v-model="filters.max_distance" input-id="filter_distance_5km" :value="5" />
              <label for="filter_distance_5km">5km</label>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div id="misc_filters" class="filter-container flex flex-col">
          Autres
          <div class="filter-container-inner justify-around">
            <div class="flex flex-col gap-1">
              <div class="bullet">
                <Checkbox v-model="filters.our_picks" class="mt-3px" :binary="true" />
                <label for="filter_our_picks">Nos coups de coeurs</label>
              </div>
              <div class="bullet">
                <Checkbox v-model="filters.wifi" class="mt-3px" :binary="true" />
                <label for="filter_wifi">Wifi</label>
              </div>
              <div class="bullet">
                <Checkbox v-model="filters.power" class="mt-3px" :binary="true" />
                <label for="filter_power">Prises</label>
              </div>
            </div>
            <div class="flex flex-col gap-1">
              <div class="bullet">
                <Checkbox v-model="filters.open_now" class="mt-3px" :binary="true" />
                <label for="filter_open">Ouvert actuellement</label>
              </div>
              <div class="bullet">
                <Checkbox v-model="filters.limit_to_map" class="mt-3px" :binary="true" />
                <label for="filter_limit_to_map">Limiter à la carte</label>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div>
        {{ filters }}
      </div>
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
