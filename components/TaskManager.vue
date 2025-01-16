<template>
  <q-page padding class="flex flex-center">
    <q-card class="q-pa-md" style="max-width: 800px; width: 100%;">
      <q-card-section>
        <h1 class="text-h5 text-center">Планировщик задач</h1>
      </q-card-section>

      <!-- Таблица с задачами -->
      <q-table
          flat
          :rows="tasks"
          row-key="id"
          :columns="columns"
          hide-bottom
          class="q-my-lg"
      >
        <template v-slot:body-cell-done="{ row }">
          <q-checkbox
              :model-value="row.done"
              @update:model-value="(value) => toggleTaskCompletion(row.id, value)"
              color="green"
          />
        </template>
        <template v-slot:body-cell-actions="{ row }">
          <q-btn
              flat
              icon="edit"
              color="primary"
              @click="editTask(row)"
              class="q-mr-sm"
          />
          <q-btn flat icon="delete" color="red" @click="deleteTask(row.id)" />
        </template>
      </q-table>

      <!-- Статистика по задачам -->
      <q-card-section class="q-pa-sm text-right">
        <q-badge color="green" label="Завершённые: {{ completedTasks }}" />
        <q-badge color="blue" label="Всего задач: {{ tasks.length }}" />
      </q-card-section>

      <!-- Кнопка добавления новой задачи -->
      <q-card-actions align="center">
        <q-btn color="primary" label="Добавить задачу" @click="openDialog()" />
      </q-card-actions>
    </q-card>

    <!-- Диалог для редактирования/добавления задач -->
    <q-dialog v-model="isDialogOpen">
      <q-card style="min-width: 400px;">
        <q-card-section>
          <div class="text-h6">
            {{ dialogTask.id ? "Редактирование задачи" : "Новая задача" }}
          </div>
        </q-card-section>

        <q-card-section>
          <q-input
              v-model="dialogTask.name"
              label="Название задачи"
              outlined
              class="q-mb-md"
          />
          <q-input v-model="dialogTask.description" label="Описание" outlined />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Отмена" @click="closeDialog" />
          <q-btn
              flat
              label="Сохранить"
              color="primary"
              @click="saveTask"
              :disable="!dialogTask.name"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue';

// Список задач (основное состояние)
const tasks = ref([
  { id: 1, name: 'Изучить Quasar', description: 'Прочитать документацию', done: false },
  { id: 2, name: 'Настроить проект', description: 'Создать Nuxt+Quasar приложение', done: true },
]);

// Состояние для диалогового окна
const isDialogOpen = ref(false);
const dialogTask = ref({ id: null, name: '', description: '', done: false });

// Столбцы таблицы
const columns = [
  { name: 'name', label: 'Название', align: 'left', field: 'name' },
  { name: 'description', label: 'Описание', align: 'left', field: 'description' },
  { name: 'done', label: 'Завершено', align: 'center', field: 'done' },
  { name: 'actions', label: 'Действия', align: 'right' },
];

// Считаем завершённые задачи
const completedTasks = computed(() => {
  return tasks.value.filter((task) => task.done).length;
});

// Открыть диалог
const openDialog = (task = null) => {
  if (task) {
    dialogTask.value = { ...task }; // Если редактируем задачу
  } else {
    dialogTask.value = { id: null, name: '', description: '', done: false }; // Если добавляем новую
  }
  isDialogOpen.value = true;
};

// Закрыть диалог
const closeDialog = () => {
  dialogTask.value = { id: null, name: '', description: '', done: false }; // Сбрасываем данные
  isDialogOpen.value = false;
};

// Сохранить задачу
const saveTask = () => {
  if (dialogTask.value.id) {
    // Редактирование существующей задачи
    const taskIndex = tasks.value.findIndex((task) => task.id === dialogTask.value.id);
    if (taskIndex !== -1) {
      tasks.value = [
        ...tasks.value.slice(0, taskIndex),
        { ...dialogTask.value },
        ...tasks.value.slice(taskIndex + 1)
      ];
    }
  } else {
    // Добавление новой задачи
    tasks.value = [
      ...tasks.value,
      { ...dialogTask.value, id: Date.now() } // Новый массив
    ];
  }
  closeDialog();
};

// Удаление задачи
const deleteTask = (id) => {
  tasks.value = tasks.value.filter((task) => task.id !== id); // Создаём новый массив
};
// Переключение состояния завершения задачи
const toggleTaskCompletion = (id, value) => {
  const taskIndex = tasks.value.findIndex((task) => task.id === id);
  if (taskIndex !== -1) {
    // Обновляем массив целиком
    tasks.value = [
      ...tasks.value.slice(0, taskIndex),
      { ...tasks.value[taskIndex], done: value }, // Меняем только нужную задачу
      ...tasks.value.slice(taskIndex + 1)
    ];
  }
};

// Редактирование задачи
const editTask = (task) => openDialog(task);
</script>

<style scoped>
/* Стили таблицы и карточек */
</style>