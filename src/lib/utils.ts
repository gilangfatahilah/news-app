import { News } from '@/types';
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const truncateText = (text: string, maxWords: number) => {
  const words = text.split(" ");
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ") + "...";
  }
  return text;
};

export const formatDate = (isoDate: string): string => {
  const date = new Date(isoDate);

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  return date.toLocaleDateString('en-US', options);
}

export const handleClickNews = (newsItem: News) => {
  const visitedNews = JSON.parse(localStorage.getItem("visitedNews") || "[]");

  const exists = visitedNews.some((item: News) => item.url === newsItem.url);

  if (!exists) {
    visitedNews.push(newsItem);
    localStorage.setItem("visitedNews", JSON.stringify(visitedNews));
  }
};