<script setup lang="ts">
import GithubIcon from "@/icons/GithubIcon.vue";
import Separator from "./ui/separator/Separator.vue";
import LinkedInIcon from "@/icons/LinkedInIcon.vue";
</script>

<template>
  <footer id="footer" class="mt-auto w-full pt-24 sm:pt-16">
    <div class="p-10 bg-muted/50 rounded-xl">
      <div class="flex justify-between">
        <div class="col-span-full xl:col-span-2">
          <a href="#" class="flex font-bold items-center">
            <img src="/src/assets/logo.svg" alt="logo" />
          </a>
        </div>

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
      </div>

      <Separator class="my-6" />
      <div class="flex gap-2 items-center justify-end">
        <a href="https://github.com/gilangfatahilah">
          <GithubIcon class="fill-primary w-6 h-6 hover:fill-primary/80" />
        </a>
        <a href="https://www.linkedin.com/in/gilang-fatahilah/">
          <LinkedInIcon class="fill-primary w-6 h-6 hover:fill-primary/80" />
        </a>
      </div>
    </div>
  </footer>
</template>
