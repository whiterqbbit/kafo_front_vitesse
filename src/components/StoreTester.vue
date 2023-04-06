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
  <div m-4 flex flex-col gap-2 p-4>
    <button btn @click="fetchJsonV2">
      Fetch JSON v2
    </button>
    <button btn @click="newName('tette')">
      CHANGE NAME
    </button>
    <div m-2 bg-green text-xl>
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
</template>
