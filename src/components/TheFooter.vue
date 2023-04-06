<script setup lang="ts">

</script>

<template>
  <nav flex justify-around bg-cafe-100>
    <a class="icon-btn">
      <div i-ph-magnifying-glass-bold />
    </a>

    <RouterLink class="icon-btn" to="/">
      <div i-ci-coffee />
    </RouterLink>

    <button class="icon-btn !outline-none">
      <div i-ci-message-circle />
    </button>

    <a class="icon-btn">
      <div i-ci-users-group />
    </a>

    <!-- <RouterLink class="icon-btn" to="/about">
      <div i-ci-calendar-event />
    </RouterLink> -->
  </nav>
</template>
