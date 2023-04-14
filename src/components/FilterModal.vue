<template>
  <div id="main_container" class="p-4 text-2xl">
    <div id="top-bar" class="flex justify-between">
      <a> Filtres</a>
      <button class="btn" @click="filters.reset()">
        Réinitialiser (x)
      </button>
    </div>
    <div id="filter_container" class="flex flex-col gap-12">
      <div class="bullet">
        <input id="filter_open" v-model="filters.open_now" type="checkbox">
        <label for="filter_open">Ouvert actuellement</label>
        <input id="filter_limit_to_map" v-model="filters.limit_to_map" type="checkbox">
        <label for="filter_limit_to_map">Limiter à la carte</label>
      </div>
      <section>
        Type de tarification
        <div class="flex flex-row justify-around">
          <div class="flex flex-col">
            A la consommation
            <div class="bullet">
              <input id="filter_coffee_shop" v-model="filters.coffee_shop" type="checkbox">
              <label for="filter_coffee_shop">Cafés</label>
            </div>
            <div class="bullet">
              <input id="filter_third_place" v-model="filters.third_place" type="checkbox">
              <label for="filter_third_place">Tiers-lieux</label>
            </div>
            <div class="bullet">
              <input id="filter_bar_restaurant" v-model="filters.bar_restaurant" type="checkbox">
              <label for="filter_bar_restaurant">Bars, Restaurants</label>
            </div>
          </div>
          <div class="flex flex-col">
            A l'heure
            <div class="bullet">
              <input id="filter-coworking" v-model="filters.coworking" type="checkbox">
              <label for="filter-coworking">Coworkings</label>
            </div>
          </div>
        </div>
      </section>
      <section>
        Ambiance
        <div class="flex justify-around">
          <div class="bullet">
            <input id="filter_silent" v-model="filters.noise_level_silent" type="checkbox">
            <label for="filter_silent">Studieux</label>
          </div>
          <div class="bullet">
            <input id="filter_calm" v-model="filters.noise_level_calm" type="checkbox">
            <label for="filter_calm">Calme</label>
          </div>
          <div class="bullet">
            <input id="filter_lively" v-model="filters.noise_level_lively" type="checkbox">
            <label for="filter_lively">Animé</label>
          </div>
        </div>
      </section>
      <section>
        Gens qui sont dedans
        <div class="flex justify-around">
          <div class="bullet">
            <input id="filter_not_empty" v-model="filters.not_empty" type="checkbox">
            <label for="filter_not_empty">Pas seultout</label>
          </div>
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
      </section>
      <section>
        Proximité
        <div id="distance_filter" class="flex justify-around">
          <div class="bullet">
            <input id="filter_1km" v-model="filters.max_distance" type="radio" :value="1">
            <label for="filter_distance_1km">1km</label>
          </div>
          <div class="bullet">
            <input id="filter_2km" v-model="filters.max_distance" type="radio" :value="2">
            <label for="filter_distance_2km">2km</label>
          </div>
          <div class="bullet">
            <input id="filter_5km" v-model="filters.max_distance" type="radio" :value="5">
            <label for="filter_distance_5km">5km</label>
          </div>
          <div class="bullet">
            <input id="none" v-model="filters.max_distance" type="radio" :value="null">
            <label for="filter_distance_none">Aucun</label>
          </div>
        </div>
      </section>
      <section>
        Autres
        <div id="misc_filters" class="justify between flex flex-col">
          <div class="bullet">
            <input id="filter_our_picks" v-model="filters.our_picks" type="checkbox">
            <label for="filter_our_picks">Nos coups de coeurs</label>
          </div>
          <div class="bullet">
            <input id="filter_wifi" v-model="filters.wifi" type="checkbox">
            <label for="filter_wifi">Wifi</label>
          </div>
          <div class="bullet">
            <input id="filter_power" v-model="filters.power" type="checkbox">
            <label for="filter_power">Prises</label>
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
</style>
