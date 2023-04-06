<script setup lang="ts">
const coffee_store = use_coffee_store()

let lol = ref<any>(null)

async function fetchJsonV2() {
  await coffee_store.fetch_coffee_db()
  lol = coffee_store.coffee_db
}

function newName(name: string) {
  coffee_store.change_name_coffee(name)
}

const isLoading = coffee_store.api_call_loading
const error = coffee_store.api_call_error
</script>

<template>
  <div>
    <button p-2 @click="fetchJsonV2">
      Fetch JSON v2
    </button>
    <button p-2 @click="newName('tette')">
      CHANGE NAME
    </button>
    <div bg-green p-2 text-4xl>
      {{ coffee_store.name_coffee
      }}  kiko {{ lol }}
    </div>
    <div v-if="isLoading">
      Loading...
    </div>
    <div v-else-if="error">
      {{ error }}
    </div>
    <div v-else-if="lol">
      <pre>{{ lol }}</pre>
    </div>
  </div>
  <div h-35px w-full flex flex-row bg-cafe-500 md:h-50px>
    <div m-auto place-self-center bg-cafe-600 font-title text-white>
      HEADER
    </div>
  </div>
  <div id="main_container" h-screen--35px flex flex-col bg-green-300 md:h-screen--50px md:flex-row-reverse>
    <div md="w-full" h-full flex items-center justify-center bg-red-100 font-title>
      <div class="text-center">
        MAP
      </div>
    </div>
    <div w-full flex overflow-auto bg-blue-200 font-title md="max-w-600px">
      <div absolute bottom-50px h-60 w-70 overflow-auto bg-blue-100 font-title md:hidden class="left-1/2 -translate-x-1/2">
        LISTE MOBILE
      </div>
      <div hidden w-full overflow-auto bg-blue-100 font-title md="block">
        LISTE DESKTOP
      </div>
    </div>
    <div block h-35px w-full bg-eggplant-300 font-title text-white md="hidden">
      FOOTER
    </div>
  </div>
</template>
