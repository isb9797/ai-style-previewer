<template>
  <div class="editor-page">
    <!-- Левая часть: Monaco Editor -->
    <div id="editor-container" class="editor-container" v-if="isClient"></div>

    <!-- Правая часть: PreviewComponents -->
    <div class="preview-container">
      <PreviewComponents id="unique-preview-container" :styles="compiledCss" :html-content="compiledHtml" />

      <!-- Кнопка обновления -->
      <q-btn
          label="Переключить тему"
          color="primary"
          @click="toggleDarkTheme"
          class="theme-button"
      />
      <q-btn
          label="Обновить превью"
          color="primary"
          @click="updatePreviewCss"
          class="update-button"
      />
    </div>
  </div>
  <q-toggle
      v-model="isDarkTheme"
      label="Темная тема"
      class="theme-toggle"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import PreviewComponents from "~/components/editor/PreviewComponents.vue";
import Sass from "sass.js"; // Обновленный импорт Sass.js
import { useEditorStore} from "~/stores/EditorStore.js";

const isClient = ref(false); // Проверяем, выполняется ли код на клиенте

const editorValue = ref(""); // Исходный SCSS-код
const compiledCss = ref(""); // Скомпилированный CSS-код
const compiledHtml = ref(""); // Скомпилированный HTML-код
const store = useEditorStore();

const isDarkTheme = ref(false); // Переключатель темной темы

onMounted(async () => {
  isClient.value = typeof window !== "undefined";

  if (isClient.value) {
    try {
      const monaco = await import("monaco-editor");

      const code = store.code;

      // Инициализация Monaco Editor
      const editor = monaco.editor.create(document.getElementById("editor-container"), {
        value: store.code,
        language: "scss",
        theme: "vs-dark",
        automaticLayout: true,
      });

      // Сохраняем изменения в editorValue
      editor.onDidChangeModelContent(() => {
editorValue.value = editor.getValue();
updatePreviewCss();
      });
    } catch (error) {
      console.error("Ошибка инициализации Monaco Editor: ", error);
    }
  }
});

// Функция для обновления стилей
function toggleDarkTheme() {
  $q.dark.set(isDarkTheme.value); // Устанавливаем темную тему Quasar
}

function updatePreviewCss() {
  if (!editorValue.value) return; // Если редактор пустой, ничего не делаем

  store.code = editorValue.value;
  // Компилируем SCSS с помощью Sass.js
  Sass.compile(editorValue.value, (callbackResult) => {
    if (callbackResult.status === 0) {
      store.classes = extractClassesFromScss(callbackResult.text);
      compiledHtml.value = generateHtmlFromClasses(store.classes); // Преобразуем классы в HTML
      compiledCss.value = `#unique-preview-container { ${callbackResult.text} }`; // Сохраняем скомпилированный CSS с уникальным контейнером
      console.log("Скомпилированный HTML:", compiledHtml.value); // Для отладки
      console.log("Скомпилированный CSS:", compiledCss.value); // Для отладки
      console.log("Классы CSS:", store.classes); // Для отладки

      store.css = compiledCss.value;
    } else {
      console.error("Ошибка компиляции SCSS:", callbackResult.formatted);
    }
  });
}

// Вспомогательная функция для извлечения классов из SCSS
function extractClassesFromScss(css) {
  const classRegex = /\.([a-zA-Z0-9_-]+)\s*{/g;
  const classes = [];
  let match;
  while ((match = classRegex.exec(css)) !== null) {
    classes.push(match[1]);
  }
  return classes;
}

// Вспомогательная функция для генерации HTML из классов
function generateHtmlFromClasses(classes) {
  return classes.map(className => `<div class="${className}"></div>`).join("\n");
}
import { useQuasar } from "quasar"; // Импорт Quasar функций

const $q = useQuasar(); // Инициализация Quasar
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

.theme-button {
  position: absolute;
  bottom: 60px;
  left: 20px;
}

.theme-toggle {
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.update-button {
  position: absolute;
  bottom: 20px;
  left: 20px;
}
</style>