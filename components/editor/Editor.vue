<template>
  <div class="editor-page">
    <!-- Левая часть: Monaco Editor -->
    <div id="editor-container" class="editor-container" v-if="isClient"></div>

    <!-- Правая часть: PreviewComponents -->
    <div class="preview-container">
      <PreviewComponents :styles="compiledCss" />

      <!-- Кнопка обновления -->
      <q-btn
          label="Обновить превью"
          color="primary"
          @click="updatePreviewCss"
          class="update-button"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PreviewComponents from "~/components/editor/PreviewComponents.vue";
import Sass from "sass.js"; // Обновленный импорт Sass.js

const isClient = ref(false); // Проверяем, выполняется ли код на клиенте

const editorValue = ref(""); // Исходный SCSS-код
const compiledCss = ref(""); // Скомпилированный CSS-код

onMounted(async () => {
  isClient.value = typeof window !== "undefined";

  if (isClient.value) {
    try {
      const monaco = await import("monaco-editor");

      // Инициализация Monaco Editor
      const editor = monaco.editor.create(document.getElementById("editor-container"), {
        value: `/* Начальный SCSS-код */
$primary-color: #3498db;
.block {
  background-color: $primary-color;
  text-align: center;
  color: #fff;
}`,
        language: "scss",
        theme: "vs-dark",
        automaticLayout: true,
      });

      // Сохраняем изменения в editorValue
      editor.onDidChangeModelContent(() => {
        editorValue.value = editor.getValue();
      });
    } catch (error) {
      console.error("Ошибка инициализации Monaco Editor: ", error);
    }
  }
});

// Функция для обновления стилей
function updatePreviewCss() {
  if (!editorValue.value) return; // Если редактор пустой, ничего не делаем

  // Компилируем SCSS с помощью Sass.js
  Sass.compile(editorValue.value, (callbackResult) => {
    if (callbackResult.status === 0) {
      compiledCss.value = callbackResult.text; // Сохраняем скомпилированный CSS
      console.log("Скомпилированный CSS:", compiledCss.value); // Для отладки
    } else {
      console.error("Ошибка компиляции SCSS:", callbackResult.formatted);
    }
  });
}
</script>

<style>
.editor-page {
  display: flex;
  width: 100%;
  height: 100vh;
}

.editor-container {
  width: 50%;
  height: 100%;
  border-right: 2px solid #ddd;
}

.preview-container {
  width: 50%;
  height: 100%;
  overflow-y: auto;
  background: #f7f7f7;
  position: relative;
}

.update-button {
  position: absolute;
  bottom: 20px;
  left: 20px;
}
</style>