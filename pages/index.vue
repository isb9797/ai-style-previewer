<template>
  <div>
    <Header />
    <MainContent />
    <Footer />
  </div>
</template>

<script setup>
import Header from '~/components/Header.vue';
import MainContent from '~/components/MainContent.vue';
import Footer from '~/components/Footer.vue';
</script>

<style>
/* Основные стили страницы */
body {
  font-family: Arial, sans-serif;
}
</style>