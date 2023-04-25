<template>
  <footer class="w-full bg-cafe-600 font-semibold">
    <div class="mx-auto max-w-7xl flex flex-row place-items-center justify-around">
      <nav flex flex-col gap-5 text-white>
        <RouterLink to="/mentions-legales">
          Mentions légales
        </RouterLink>
        <RouterLink to="/confidentialite">
          Confidentialité
        </RouterLink>
        <RouterLink to="/a-propos">
          A Propos
        </RouterLink>
        <RouterLink to="/a-propos">
          Devenir partenaire
        </RouterLink>
      </nav>
      <nav flex flex-col gap-5 text-white>
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
      <nav flex flex-col gap-5 text-white>
        <div />
        <RouterLink to="/FAQ">
          Instagram
        </RouterLink>
        <RouterLink to="/contact">
          Linkedin
        </RouterLink>
        <RouterLink to="/a-propos">
          Contact
        </RouterLink>
      </nav>
    </div>
  </footer>
</template>

<script setup lang="ts">
</script>
