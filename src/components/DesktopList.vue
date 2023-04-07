<template>
  <div>
    <div v-for="(coffee, index) in use_coffee_store().coffee_db" :key="index">
      <div m-4 h-48 rounded-xl bg-cafe-300>
        {{ coffee.nom }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>
