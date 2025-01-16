<template>
  <q-layout class="q-layout-container">
    <q-page-container>
      <Header />
      <MainContent />
    </q-page-container>
    <Footer />
  </q-layout>
</template>

<script setup>
import Header from '@/components/Header.vue';
import MainContent from '@/components/MainContent.vue';
import Footer from '@/components/Footer.vue';
</script>

<style>
/* Опционально, дополнительные стили для q-layout */
.q-layout-container {
  min-height: 100vh; /* Высота страницы */
  display: flex;
  flex-direction: column; /* Фиксация элементов */
}

.q-page-container {
  flex: 1; /* Раcтягивание главной части */
}
</style>