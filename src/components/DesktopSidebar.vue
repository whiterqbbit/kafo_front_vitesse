<template>
  <div class="ml-2 mt-4 w-16 flex flex-col place-items-center gap-1 p-1">
    <div
      class="icon"
      :class="[display.filter_modal ? 'activated' : 'desactivated']"
      @click="display.filter_modal = !display.filter_modal"
    >
      <button i-fa6-solid-user-group class="h-10" />
    </div>
    <span class="name">Groupes</span>
    <div
      class="icon"
      :class="[display.filter_modal ? 'activated' : 'desactivated']"
      @click="display.filter_modal = !display.filter_modal"
    >
      <button i-fa6-solid-sliders class="h-10" />
    </div>
    <span class="name">Filtres</span>
    <div
      class="icon"
      :class="[display.filter_modal ? 'activated' : 'desactivated']"
      @click="display.filter_modal = !display.filter_modal"
    >
      <button i-fa6-solid-compass class="h-10" />
    </div>
    <span class="name">Découvrir</span>
    <div
      class="icon"
      :class="[display.filter_modal ? 'activated' : 'desactivated']"
      @click="display.filter_modal = !display.filter_modal"
    >
      <button i-fa6-solid-comment class="h-10" />
    </div>
    <span class="name">Chats</span>
  </div>
</template>

<style scoped>
.icon {
    @apply h-fit flex place-items-center place-self-center rounded-xl p-2 shadow-md;
}
.activated {
    @apply bg-cafe-600 text-white;
}

.desactivated {
    @apply bg-white text-cafe-600;
}
.name {
    @apply mb-1 font-normal text-sm;
}
</style>
