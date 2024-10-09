<script setup lang="ts">
import Separator from "./ui/separator/Separator.vue";
</script>

<template>
  <footer id="footer" class="pt-24 sm:pt-32">
    <div class="p-10 bg-muted/50 rounded-xl">
      <div class="flex justify-between">
        <div class="col-span-full xl:col-span-2">
          <a href="#" class="flex font-bold items-center">
            <img src="/src/assets/logo.svg" alt="logo" />
          </a>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Socials</h3>
          <div>
            <a href="#" class="opacity-60 hover:opacity-100"> Twitch </a>
          </div>

          <div>
            <a href="#" class="opacity-60 hover:opacity-100"> Discord </a>
          </div>

          <div>
            <a href="#" class="opacity-60 hover:opacity-100"> Dribbble </a>
          </div>
        </div>

        <div class="flex flex-col gap-2">
          <h3 class="font-bold text-lg">Socials</h3>
          <div>
            <a href="#" class="opacity-60 hover:opacity-100"> Twitch </a>
          </div>

          <div>
            <a href="#" class="opacity-60 hover:opacity-100"> Discord </a>
          </div>

          <div>
            <a href="#" class="opacity-60 hover:opacity-100"> Dribbble </a>
          </div>
        </div>
      </div>

      <Separator class="my-6" />
      <section className="">
        <h3 class="">
          &copy; Developed by
          <a
            target="_blank"
            href="https://gilangf.vercel.app"
            className="text-primary transition-all border-primary hover:border-b-2"
          >
            Gilang Fatahilah
          </a>
        </h3>
      </section>
    </div>
  </footer>
</template>
