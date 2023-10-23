<template>
    <div v-if="showPopup" class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg">
      <p class="text-center text-indigo-600 text-xl font-bold mb-2">Cadastro realizado com sucesso!</p>
      <button @click="closePopup" class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg">
        Fechar
      </button>
    </div>
  </template>
  
  <script setup>
import { ref } from 'vue';

const showPopup = ref(false);

function closePopup() {
  showPopup.value = false;
}
  </script>
  
