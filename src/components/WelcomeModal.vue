<template>
  <div class="fixed z-30 h-full w-full flex place-content-center place-items-center">
    <!-- Backdrop -->
    <div class="fixed h-full w-full cursor-pointer bg-gray-600/20" @click="close_modal" />
    <!-- Main Div -->
    <div
      class="relative m-2 h-fit max-w-120 w-full flex flex-col animate-zoom-in-up rounded-xl bg-cafe-100 p-5 sm:m-3 sm:p-10"
      @click="close_modal"
    >
      <div id="title" class="mx-auto mb-8 text-3xl font-bold">
        Kafo fait peau neuve !
      </div>
      <div id="content" class="mx-auto mb-8">
        En ce joli mois de Mai, nous mettons progressivement à jour Kafo.<br>
        Certaines fonctions sociales ne sont plus en ligne, mais elles reviennent dans les jours à venir !<br>
        N'hésitez pas à nous faire part de tout retour :)
      </div>
      <div class="mx-auto btn-cafe" @click="close_modal">
        Continuer
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
function close_modal() {
  stored_display.value.welcome_modal = false
}
</script>
