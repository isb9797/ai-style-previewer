<template>
  <q-page class="q-pa-md">
    <q-card class="q-my-lg">
      <q-card-section>
        <p class="text-h6">
          Вы находитесь на маршруте: <q-badge color="red" text-color="white">{{ route.path }}</q-badge>
        </p>
      </q-card-section>
      <q-card-actions>
        <q-btn flat label="Узнать больше" color="primary" to="/about" />
      </q-card-actions>
    </q-card>

    <Editor />

  </q-page>
</template>

<script setup>
import { useRoute } from 'vue-router';
import TaskManager from "~/components/TaskManager.vue";
import Editor from "~/components/editor/Editor.vue";
const route = useRoute();
</script>