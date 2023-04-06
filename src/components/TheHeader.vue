<template>
  <header h-35px w-full flex flex-row place-items-center justify-between bg-cafe-500 md:h-50px>
    <RouterLink icon-btn to="/" title="home">
      <img src="src/assets/img/logo/kafo_logo_light.png" alt="logo" class="h-9 pl-4 md:h-12">
    </RouterLink>
    <nav flex gap-5 font-black text-white>
      <RouterLink to="/contact" title="contact">
        FAQ
      </RouterLink>
      <RouterLink to="/contact" title="contact">
        Contact
      </RouterLink>
      <RouterLink to="/about" title="about">
        About
      </RouterLink>
    </nav>
    <div btn>
      Login
    </div>
  </header>
</template>
