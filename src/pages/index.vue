<script setup lang="ts">
// defineOptions({
//   name: 'IndexPage',
// })
// const user = useUserStore()
// const name = $ref(user.savedName)

// const router = useRouter()
// const go = () => {
//   if (name)
//     router.push(`/hi/${encodeURIComponent(name)}`)
// }
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-campsite inline-block />
    </div>
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank">
        Vitesse
      </a>
    </p>
    <p>
      <em text-sm opacity-75>intro.desc</em>
    </p>

    <div py-4 />

    <TheInput
      placeholder="What's your name?"
      autocomplete="false"
    />
    <label class="hidden" for="input">intro.whats-your-name</label>

    <div>
      <button
        m-3 text-sm btn
      >
        button.go
      </button>
    </div>
  </div>
</template>
