<template>
  <nav flex justify-around bg-cafe-100>
    <div class="icon-box">
      <div i-ph-magnifying-glass-bold class="icon-btn" />
      <div text-xs>
        Rechercher
      </div>
    </div>

    <div class="icon-box">
      <div i-ci-coffee class="icon-btn" />
      <div text-xs>
        Sessions
      </div>
    </div>

    <div class="icon-box">
      <div i-ci-message-circle class="icon-btn" />
      <div text-xs>
        Discussions
      </div>
    </div>

    <div class="icon-box">
      <div i-ci-users-group class="icon-btn" />
      <div text-xs>
        Clubs
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">

</script>

<style scoped>
.icon-box {
  @apply flex flex-col items-center justify-center gap-1 select-none trans-grass-700;
}

.icon-btn {
  @apply text-xl inline-block cursor-pointer ;
}
</style>
