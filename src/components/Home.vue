<script setup lang="ts">
import { onMounted, ref, watch } from "vue";

import { Skeleton } from "@/components/ui/skeleton";

import { News } from "@/types";
import NewsServices from "@/services/news.service";
import { formatDate, truncateText, handleClickNews } from "@/lib/utils";

const props = defineProps<{
  category?: string;
}>();

const newsData = ref<News[]>([]);
const loading = ref<boolean>(false);
const sectionTitle = ref<string>("Top Headlines");

const fetchData = async (category: string = "general") => {
  try {
    loading.value = true;
    const { data } = await NewsServices.getTopHeadlines({
      country: "us",
      page: 1,
      pageSize: 10,
      category,
    });
    console.log(data);
    newsData.value = data.articles;
  } catch (error) {
    console.log("Unexpected error occurred");
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData());

watch(
  () => [props.category],
  () => {
    if (props.category) {
      fetchData(props.category);
      sectionTitle.value = `Top Headlines in ${
        props.category?.charAt(0).toUpperCase() + props.category?.slice(1)
      }`;
    }
  }
);
</script>

<template>
  <section class="container py-8 space-y-8 lg:py-12 lg:space-y-12">
    <div class="w-full flex justify-center">
      <h1 class="text-center text-4xl lg:text-6xl font-bold">{{ sectionTitle }}</h1>
    </div>

    <div class="grid lg:grid-cols-2 place-items-start lg:gap-8">
      <!-- Row 1 Col 1 -->
      <Card
        v-if="!loading"
        class="bg-muted h-full relative overflow-hidden rounded-lg shadow-lg flex flex-col justify-between transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
      >
        <a
          :href="newsData[0]?.url ?? '#'"
          class="absolute inset-0 z-10"
          @click="handleClickNews(newsData[0])"
        >
          <span class="sr-only"> View </span>
        </a>
        <img
          :src="
            newsData[0]?.urlToImage ??
            'https://via.assets.so/img.jpg?w=800&h=400&tc=white&bg=#cecece&t=???'
          "
          :alt="newsData[0]?.title ?? 'Unknown'"
          class="h-full w-full object-cover"
        />

        <CardContent class="p-4 flex-1">
          <div class="flex justify-between items-center text-md text-primary font-medium">
            <p>
              {{ formatDate(newsData[0]?.publishedAt ?? "") || "-" }}
            </p>
            <p>
              {{ newsData[0]?.source?.name ?? "Unknown" }}
            </p>
          </div>

          <h2 class="text-4xl mt-2 font-bold">
            {{ newsData[0]?.title ?? "Unknown" }}
          </h2>

          <p class="mt-2 text-md text-muted-foreground">
            {{ truncateText(newsData[0]?.description ?? "", 30) }}
          </p>
        </CardContent>

        <CardFooter class="p-4">
          <p class="text-muted text-md">
            {{ "Author : " + (newsData[0].author ?? "Unknown") }}
          </p>
        </CardFooter>
      </Card>

      <!-- Fallback Card -->
      <Card
        v-else
        class="bg-background w-full h-full relative overflow-hidden rounded-lg shadow-lg flex flex-col justify-between space-y-4"
      >
        <CardContent class="h-4/5 space-y-4">
          <Skeleton class="w-full h-1/2" />
          <div class="w-full flex justify-between items-center">
            <Skeleton class="w-1/3 h-8" />
            <Skeleton class="w-1/3 h-8" />
          </div>
          <Skeleton class="w-full h-1/4" />
          <Skeleton class="w-full h-24" />
        </CardContent>
        <CardFooter>
          <Skeleton class="w-full h-12" />
        </CardFooter>
      </Card>

      <!-- Row 1 Col 2 -->
      <div class="grid lg:grid-cols-2 gap-4 w-full">
        <Card
          v-for="(
            { source, title, description, url, urlToImage, publishedAt, author }, index
          ) in newsData.slice(1, 5)"
          :key="index"
          v-if="!loading"
          class="bg-muted relative overflow-hidden rounded-lg shadow-lg flex flex-col justify-between transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
        >
          <a
            :href="url ?? '#'"
            class="absolute inset-0 z-10"
            @click="handleClickNews(newsData[index])"
          >
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

          <CardContent class="p-4 flex-1">
            <div
              class="flex justify-between items-center text-sm text-primary font-medium"
            >
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

            <p class="mt-2 text-sm text-muted-foreground">
              {{ truncateText(description ?? "", 15) }}
            </p>
          </CardContent>

          <CardFooter class="p-4">
            <p class="text-muted text-sm">
              {{ "Author : " + (author ?? "Unknown") }}
            </p>
          </CardFooter>
        </Card>

        <!-- Fallback card -->
        <Card
          v-else
          v-for="index in 4"
          :key="index + 1"
          class="bg-background w-full h-80 relative overflow-hidden rounded-lg shadow-lg flex flex-col justify-between space-y-4"
        >
          <CardContent class="h-4/5 space-y-4">
            <Skeleton class="w-full h-1/2" />
            <div class="w-full flex justify-between items-center">
              <Skeleton class="w-1/3 h-6" />
              <Skeleton class="w-1/3 h-6" />
            </div>
            <Skeleton class="w-full h-12" />
            <Skeleton class="w-full h-10" />
          </CardContent>
          <CardFooter>
            <Skeleton class="w-full h-4" />
          </CardFooter>
        </Card>
      </div>

      <!-- Row 2 Col 1 -->
      <div class="grid lg:grid-cols-2 gap-4 w-full">
        <Card
          v-for="(
            { source, title, description, url, urlToImage, publishedAt, author }, index
          ) in newsData.slice(5, 9)"
          :key="index"
          v-if="!loading"
          class="bg-muted relative overflow-hidden rounded-lg shadow-lg flex flex-col justify-between transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
        >
          <a
            :href="url ?? '#'"
            class="absolute inset-0 z-10"
            @click="handleClickNews(newsData[index])"
          >
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

          <CardContent class="p-4 flex-1">
            <div
              class="flex justify-between items-center text-sm text-primary font-medium"
            >
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

            <p class="mt-2 text-sm text-muted-foreground">
              {{ truncateText(description ?? "", 15) }}
            </p>
          </CardContent>

          <CardFooter class="p-4">
            <p class="text-muted text-sm">
              {{ "Author : " + (author ?? "Unknown") }}
            </p>
          </CardFooter>
        </Card>

        <!-- Fallback card -->
        <Card
          v-else
          v-for="index in 4"
          :key="index + 1"
          class="bg-background w-full h-80 relative overflow-hidden rounded-lg shadow-lg flex flex-col justify-between space-y-4"
        >
          <CardContent class="h-4/5 space-y-4">
            <Skeleton class="w-full h-1/2" />
            <div class="w-full flex justify-between items-center">
              <Skeleton class="w-1/3 h-6" />
              <Skeleton class="w-1/3 h-6" />
            </div>
            <Skeleton class="w-full h-12" />
            <Skeleton class="w-full h-10" />
          </CardContent>
          <CardFooter>
            <Skeleton class="w-full h-4" />
          </CardFooter>
        </Card>
      </div>

      <!-- Row 2 Col 2 -->
      <Card
        v-if="!loading"
        class="bg-muted h-full relative overflow-hidden rounded-lg shadow-lg flex flex-col justify-between transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
      >
        <a
          :href="newsData[newsData.length - 1]?.url ?? '#'"
          class="absolute inset-0 z-10"
          @click="handleClickNews(newsData[newsData.length - 1])"
        >
          <span class="sr-only"> View </span>
        </a>
        <img
          :src="
            newsData[newsData.length - 1]?.urlToImage ??
            'https://via.assets.so/img.jpg?w=800&h=400&tc=white&bg=#cecece&t=???'
          "
          :alt="newsData[newsData.length - 1]?.title ?? 'Unknown'"
          class="h-full w-full object-cover"
        />

        <CardContent class="p-4 flex-1">
          <div class="flex justify-between items-center text-md text-primary font-medium">
            <p>
              {{ formatDate(newsData[newsData.length - 1]?.publishedAt ?? "") || "-" }}
            </p>
            <p>
              {{ newsData[newsData.length - 1]?.source?.name ?? "Unknown" }}
            </p>
          </div>

          <h2 class="text-4xl mt-2 font-bold">
            {{ newsData[newsData.length - 1]?.title ?? "Unknown" }}
          </h2>

          <p class="mt-2 text-md text-muted-foreground">
            {{ truncateText(newsData[newsData.length - 1]?.description ?? "", 30) }}
          </p>
        </CardContent>

        <CardFooter class="p-4">
          <p class="text-muted text-md">
            {{ "Author : " + (newsData[newsData.length - 1]?.author ?? "Unknown") }}
          </p>
        </CardFooter>
      </Card>

      <!-- Fallback Card -->
      <Card
        v-else
        class="bg-background w-full h-full relative overflow-hidden rounded-lg shadow-lg flex flex-col justify-between space-y-4"
      >
        <CardContent class="h-4/5 space-y-4">
          <Skeleton class="w-full h-1/2" />
          <div class="w-full flex justify-between items-center">
            <Skeleton class="w-1/3 h-8" />
            <Skeleton class="w-1/3 h-8" />
          </div>
          <Skeleton class="w-full h-1/4" />
          <Skeleton class="w-full h-24" />
        </CardContent>
        <CardFooter>
          <Skeleton class="w-full h-12" />
        </CardFooter>
      </Card>
    </div>
  </section>
</template>

<style scoped></style>
