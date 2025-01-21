<template>
  <div>
    <div>
      {{ store.components }}

      <br>
      СТИЛИ
      <pre>{{ store.css }}</pre>



    </div>
    <div v-html="styledTemplate" />

  </div>

</template>

<script setup>
import { computed } from "vue";
import {useEditorStore} from "~/stores/EditorStore.js";


const store = useEditorStore();

// Пример компонентов с заданными классами (можно расширить логикой)
const mockComponents = store.components.map (component => {
  if (component.type === "block") {
    return `<div class="block"> ${component.content} </div>`
  } else if (component.type === "string") {
    return `<span class="string">${component.content}</span>`
  }
});

// Применение пользовательских стилей
const styledTemplate = computed(() => `<style>${store.css}</style>${mockComponents}`);



</script>