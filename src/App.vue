<script setup lang="ts">
import { ref } from "vue";

import Navbar from "./components/Navbar.vue";
import Home from "./components/Home.vue";
import SearchResult from "./components/SearchResult.vue";
import History from "./components/History.vue";
import Footer from "./components/Footer.vue";

const newsCategory = ref<string>("");
const isSearch = ref<boolean>(false);
const isHistory = ref<boolean>(false);
const searchQuery = ref<string>("");

const handleSelectCategory = (category: string) => {
  newsCategory.value = category;
  isSearch.value = false;
  isHistory.value = false;
};

const handleSearch = (query: string) => {
  searchQuery.value = query;
  isSearch.value = true;
  isHistory.value = false;
};
</script>

<template>
  <Navbar
    @select-category="handleSelectCategory"
    @search="handleSearch"
    @history="(isHistory = true), (isSearch = false)"
  />
  <Home v-if="!isSearch && !isHistory" :category="newsCategory" />
  <SearchResult v-if="isSearch" :query="searchQuery" />
  <History v-if="isHistory" />
  <Footer />
</template>
