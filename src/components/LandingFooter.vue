<template>
  <footer class="sticky top-0 w-full bg-cafe-500 font-bold">
    <div class="mx-auto h-35px max-w-7xl flex flex-row place-items-center justify-between md:h-50px">
      <RouterLink class="icon-btn" to="/">
        <img :src="logo" alt="logo" class="h-9 pl-4 md:h-12 lg:pl-0">
      </RouterLink>
      <nav flex gap-5 text-white>
        <RouterLink to="/FAQ">
          FAQ
        </RouterLink>
        <RouterLink to="/contact">
          Contact
        </RouterLink>
        <RouterLink to="/a-propos">
          A Propos
        </RouterLink>
        <RouterLink to="/a-propos">
          Devenir partenaire
        </RouterLink>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
import logo from '@/assets/img/logo/kafo_logo_white.png'
</script>
