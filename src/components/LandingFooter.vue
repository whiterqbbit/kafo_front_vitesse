w<template>
  <footer class="mt-20 h-full w-full bg-cafe-600 py-8 font-semibold">
    <div class="mx-auto max-w-7xl flex flex-row place-items-center justify-around">
      <nav class="col">
        <RouterLink to="/mentions-legales">
          Mentions légales
        </RouterLink>
        <RouterLink to="/confidentialite">
          Confidentialité
        </RouterLink>
      </nav>
      <nav class="col">
        <RouterLink to="/Nos valeurs">
          Nos valeurs
        </RouterLink>
        <RouterLink to="/a-propos">
          A Propos
        </RouterLink>
        <RouterLink to="/partenaire">
          Devenir partenaire
        </RouterLink>
      </nav>
      <nav class="col">
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

<style>
.col {
  @apply flex flex-col text-white h-full gap-2;
}
</style>
