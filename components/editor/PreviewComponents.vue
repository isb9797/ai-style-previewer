<template>
  <div v-html="styledTemplate" />
</template>

<script setup>
import { computed } from "vue";

// Пример компонентов с заданными классами (можно расширить логикой)
const mockComponents = `
  <div class="block">Div Block</div>
  <p class="string">This is a string</p>
  <button class="button">Click Me</button>
`;

// Применение пользовательских стилей
const styledTemplate = computed(() => `<style>${props.styles}</style>${mockComponents}`);

const props = defineProps({
  styles: {
    type: String,
    default: "",
  },
});
</script>