<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { News } from "@/types";
import NewsServices from "@/services/news.service";
import { formatDate, handleClickNews, truncateText } from "@/lib/utils";
import Button from "./ui/button/Button.vue";

const props = defineProps<{
  query: string;
}>();

const newsData = ref<News[]>([]);
const dataQuery = ref<string>(props.query);
const loading = ref<boolean>(false);
const page = ref<number>(1);
const totalPages = ref<number>(0);

const fetchData = async (query: string, pageNum: number = 1) => {
  try {
    loading.value = true;
    const { data } = await NewsServices.getEverything({
      q: query,
      page: pageNum,
      pageSize: 10,
    });
    newsData.value = data.articles;
    totalPages.value = Math.ceil(data.totalResults / 10);
  } catch (error) {
    console.log("Unexpected error occurred");
  } finally {
    loading.value = false;
  }
};

const goToPage = (newPage: number) => {
  if (newPage > 0 && newPage <= totalPages.value) {
    page.value = newPage;
    fetchData(props.query, page.value);
  }
};

watch(
  () => props.query,
  (newValue, oldValue) => {
    console.log(newValue);
    dataQuery.value = newValue;
    fetchData(dataQuery.value);
  }
);

onMounted(fetchData(dataQuery.value));
</script>

<template>
  <section class="container py-12 lg:24 space-y-12">
    <div class="w-full flex justify-center">
      <h1 class="text-4xl text-center lg:text-5xl font-bold">
        {{
          newsData.length ? `Search result for "${query}"` : `No result for "${query}"`
        }}
      </h1>
    </div>

    <div
      v-if="newsData.length"
      class="w-full md:w-3/4 mx-auto flex flex-col items-center gap-4 lg:gap-8"
    >
      <Card
        v-if="!loading"
        v-for="(
          { source, title, description, url, urlToImage, publishedAt, author }, index
        ) in newsData"
        :key="index"
        class="bg-muted w-full relative overflow-hidden rounded-lg shadow-lg flex flex-col md:flex-row gap-4 p-2 hover:bg-muted/80"
      >
        <a
          :href="url"
          class="absolute inset-0 z-10"
          @click="handleClickNews(newsData[index])"
        >
          <span class="sr-only"> View </span>
        </a>

        <div class="w-full md:w-1/3">
          <img
            :src="
              urlToImage ??
              'https://via.assets.so/img.jpg?w=800&h=400&tc=white&bg=#cecece&t=???'
            "
            :alt="title ?? 'Unknown'"
            class="h-48 w-full object-cover"
          />
        </div>

        <CardContent class="w-full md:w-2/3 p-2 flex flex-col justify-between">
          <div class="flex flex-col gap-1">
            <div
              class="flex justify-between items-center text-primary text-base font-medium"
            >
              <p>
                {{ source.name }}
              </p>
              <p>
                {{ formatDate(publishedAt) }}
              </p>
            </div>
            <h1 class="text-xl font-bold">
              {{ title }}
            </h1>

            <p class="text-muted-foreground text-sm">
              {{ truncateText(description, 20) }}
            </p>
          </div>

          <p class="text-muted text-sm md:text-base">
            {{ `Author : ${author}` }}
          </p>
        </CardContent>
      </Card>

      <!-- Card fallback -->
      <Card
        v-else
        v-for="index in 5"
        :key="index + 1"
        class="bg-background w-full relative overflow-hidden rounded-lg shadow-lg flex gap-4 p-2"
      >
        <div class="w-1/3">
          <Skeleton class="w-full h-48" />
        </div>
        <CardContent class="w-2/3 p-2 flex flex-col justify-between">
          <div class="flex flex-col gap-2">
            <div class="flex justify-between items-center mb-2">
              <Skeleton class="w-1/3 h-4" />
              <Skeleton class="w-1/3 h-4" />
            </div>
            <Skeleton class="w-full h-12" />
            <Skeleton class="w-full h-8" />
          </div>

          <Skeleton class="w-full h-8" />
        </CardContent>
      </Card>
    </div>

    <!-- Pagination buttons -->
    <div
      v-if="newsData.length"
      class="w-full md:w-3/4 md:mx-auto flex justify-between gap-2 mt-6"
    >
      <Button
        @click="goToPage(page - 1)"
        :disabled="page === 1"
        variant="default"
        class="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-100"
      >
        Previous
      </Button>
      <span>Page {{ page }} of {{ totalPages }}</span>
      <Button
        @click="goToPage(page + 1)"
        :disabled="page === totalPages"
        variant="default"
        class="px-4 py-2 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-100"
      >
        Next
      </Button>
    </div>
  </section>
</template>
