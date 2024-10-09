<script lang="ts" setup>
import { ref } from "vue";

import { useColorMode } from "@vueuse/core";
const mode = useColorMode();
mode.value = "dark";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { Input } from "./ui/input";
import { Separator } from "@/components/ui/separator";

import { Menu } from "lucide-vue-next";
import ToggleTheme from "./ToggleTheme.vue";

interface CategoryList {
  value: string;
  label: string;
}

const categoryList: CategoryList[] = [
  {
    value: "business",
    label: "Business",
  },
  {
    value: "entertainment",
    label: "Entertainment",
  },
  {
    value: "health",
    label: "Health",
  },
  {
    value: "sports",
    label: "Sports",
  },
  {
    value: "technology",
    label: "Technology",
  },
];

const emit = defineEmits<{
  (e: "select-category", category: string): void;
  (e: "search", query: string): void;
  (e: "history"): void;
}>();

const isOpen = ref<boolean>(false);
const searchValue = ref<string>("");

const handleSelectCategory = (value: string) => {
  if (isOpen) {
    isOpen.value = false;
  }
  emit("select-category", value);
};

const handleSearch = (event: any) => {
  if (event.key === "Enter" && searchValue.value !== "") {
    if (isOpen) isOpen.value = false;
    emit("search", searchValue.value);
  }
};
</script>

<template>
  <header
    :class="{
      'shadow-light': mode === 'light',
      'shadow-dark': mode === 'dark',
      'w-[90%] md:w-[70%] lg:w-[85%] lg:max-w-screen-xl top-5 mx-auto sticky border z-40 rounded-2xl flex justify-between items-center p-2 bg-card shadow-md': true,
    }"
  >
    <a href="/" class="font-bold text-lg flex items-center">
      <img src="/src/assets/logo.svg" alt="logo" />
    </a>
    <!-- Mobile -->
    <div class="flex items-center lg:hidden">
      <Sheet v-model:open="isOpen">
        <SheetTrigger as-child>
          <Menu @click="isOpen = true" class="cursor-pointer" />
        </SheetTrigger>

        <SheetContent
          side="left"
          class="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card"
        >
          <div>
            <SheetHeader class="mb-4 ml-4">
              <SheetTitle class="flex items-center">
                <a href="/" class="flex items-center">
                  <img src="/src/assets/logo.svg" alt="logo" />
                </a>
              </SheetTitle>
            </SheetHeader>

            <div class="flex flex-col gap-2">
              <Input
                v-model="searchValue"
                type="text"
                placeholder="Search..."
                @keyup="handleSearch"
                @blur="searchValue = ''"
              />

              <Button
                v-for="{ value, label } in categoryList"
                :key="label"
                as-child
                variant="ghost"
                class="justify-start text-base"
                @click="handleSelectCategory(value)"
              >
                <p>
                  {{ label }}
                </p>
              </Button>
            </div>
          </div>

          <SheetFooter class="flex-col sm:flex-col justify-start items-start">
            <Separator class="mb-2" />

            <ToggleTheme />
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>

    <!-- Desktop -->
    <NavigationMenu class="hidden lg:block">
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink asChild>
            <Button
              v-for="{ value, label } in categoryList"
              :key="label"
              as-child
              variant="ghost"
              class="justify-start text-base"
              @click="handleSelectCategory(value)"
            >
              <p class="cursor-pointer">
                {{ label }}
              </p>
            </Button>
            <Button as-child variant="ghost" class="text-base" @click="emit('history')">
              <p>History</p>
            </Button>
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>

    <div class="hidden lg:flex lg:w-1/4 lg:justify-end lg:gap-2">
      <Input
        v-model="searchValue"
        type="text"
        placeholder="Search..."
        @keyup="handleSearch"
        @blur="searchValue = ''"
      />
      <div class="w-1/5">
        <ToggleTheme />
      </div>
    </div>
  </header>
</template>

<style scoped>
.shadow-light {
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.085);
}

.shadow-dark {
  box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.141);
}
</style>
