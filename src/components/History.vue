<script setup lang="ts">
import { computed, ref } from "vue";
import { News } from "@/types";
import { formatDate } from "@/lib/utils";

const data: News[] = JSON.parse(localStorage.getItem("visitedNews") ?? "[]");

const currentPage = ref<number>(1);
const itemsPerPage = ref<number>(10);
const totalPages = ref<number>(Math.ceil(data.length / itemsPerPage.value));

const goToPage = (page: number) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return data.slice(start, end);
});
</script>

<template>
  <section class="container py-8 space-y-8 lg:py-12 lg:space-y-12">
    <div class="w-full flex justify-center">
      <h1 class="text-center text-4xl lg:text-6xl font-bold">
        {{ data.length ? "Your history news" : "No news visited yet" }}
      </h1>
    </div>

    <div class="md:w-3/4 md:mx-auto grid lg:grid-cols-4 place-items-start lg:gap-8">
      <Card
        v-for="({ title, url, urlToImage, publishedAt, source }, index) in paginatedData"
        :key="index"
        class="bg-muted relative overflow-hidden rounded-lg shadow-lg flex flex-col justify-between transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl h-full"
      >
        <a :href="url ?? '#'" class="absolute inset-0 z-10">
          <span class="sr-only"> View </span>
        </a>
        <img
          :src="
            urlToImage ??
            'https://via.assets.so/img.jpg?w=800&h=400&tc=white&bg=#cecece&t=???'
          "
          :alt="title ?? 'Unknown'"
          :width="500"
          :height="300"
          class="h-48 w-full object-cover"
        />

        <CardContent class="p-4 pb-6 flex-1 h-full">
          <div class="flex justify-between items-center text-sm text-primary font-medium">
            <p>
              {{ formatDate(publishedAt ?? "") || "-" }}
            </p>
            <p>
              {{ source?.name ?? "Unknown" }}
            </p>
          </div>

          <h2 class="text-xl font-semibold">
            {{ title ?? "Unknown" }}
          </h2>
        </CardContent>
      </Card>
    </div>

    <div v-if="data.length" class="md:w-3/4 md:mx-auto flex justify-between space-x-4">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="bg-primary text-white px-4 py-2 rounded"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="bg-primary text-white px-4 py-2 rounded"
      >
        Next
      </button>
    </div>
  </section>
</template>
