<template lang="">
  <div class="absolute right-0 z-20 h-screen--50px max-w-200 w-1/4 flex animate-fade-in-right animate-duration-100 border-l-2 border-cafe-400 rounded-xl bg-cafe-100 p-3 shadow-md">
    <!-- liste des chatrooms -->
    <div class="border-r-2 border-cafe-400 p-2">
      <div class="text-xl font-bold">
        Contacts
      </div>
    </div>
    <!-- messages -->
    <div class="p-2">
      <div class="text-xl font-bold">
        Nom du contact
      </div>
      {{ chat_store.DMS }}
    </div>
  </div>
</template>

<script setup lang="ts">
const chat_store = use_chat_store()

chat_store.get_all_messages()
</script>
