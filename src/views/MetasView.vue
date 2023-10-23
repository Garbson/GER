<template>
  <div class="min-h-screen flex-col flex font-mukta bg-repeat bg-cover bg-[url('public/img/background.jpg')]">
    <TheSidebar></TheSidebar>
    <div class="flex justify-center items-center">
      <div class="max-w-lg w-11/12 h-full mb-5 p-8 bg-white rounded-lg shadow-md relative mt-5">
        <h1 class="text-3xl font-semibold text-blue-600 mb-4 flex justify-center">Meu Caderno de Metas</h1>
        <div class="mb-4">
          <input
            v-model="novaAnotacao.titulo"
            class="w-full p-2 border rounded shadow-md"
            placeholder="Título"
          />
        </div>
        <div class="mb-4">
          <textarea
            v-model="novaAnotacao.conteudo"
            class="w-full p-2 border rounded shadow-md"
            placeholder="Conteúdo"
          ></textarea>
        </div>
        <div class="mb-4">
          <button @click="adicionarAnotacao" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Adicionar Meta
          </button>
        </div>
        <div class="anotacoes" :style="{ 'max-height': cardHeight - 100 + 'px', 'overflow-y': maxHeightReached ? 'auto' : 'visible' }">
          <div v-for="(anotacao, index) in anotacoes" :key="index" class="mb-4 border p-4 rounded shadow-md">
            <h2 class="text-xl font-semibold text-blue-600">{{ anotacao.titulo }}</h2>
            <p class="text-gray-700">{{ anotacao.conteudo }}</p>
            <label class="mt-2 flex items-center">
              <input
                type="checkbox"
                v-model="anotacao.concluida"
                class="mr-2 border rounded"
              />
              Concluída
            </label>
            <button @click="removerAnotacao(index)" class="bg-red-600 text-white py-1 px-2 mt-2 rounded hover:bg-red-700">
              Excluir
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import TheSidebar from "../components/TheSidebar.vue";
  
  const novaAnotacao = ref({
    titulo: "",
    conteudo: "",
    concluida: false,
  });
  
  const anotacoes = ref([]);
  
  const adicionarAnotacao = () => {
    anotacoes.value.push({ ...novaAnotacao.value });
    novaAnotacao.value = { titulo: "", conteudo: "", concluida: false };
    salvarAnotacoesNoLocalStorage();
  };
  
  const removerAnotacao = (index) => {
    anotacoes.value.splice(index, 1);
    salvarAnotacoesNoLocalStorage();
  };
  
  const salvarAnotacoesNoLocalStorage = () => {
    localStorage.setItem("anotacoes", JSON.stringify(anotacoes.value));
  };
  
  const carregarAnotacoesDoLocalStorage = () => {
    const anotacoesSalvas = localStorage.getItem("anotacoes");
    if (anotacoesSalvas) {
      anotacoes.value = JSON.parse(anotacoesSalvas);
    }
  };
  
  onMounted(() => {
    carregarAnotacoesDoLocalStorage();
  });
  
  // Calcula a altura máxima com base na altura da janela
  const cardHeight = computed(() => window.innerHeight - 200); // Ajuste conforme necessário
  const maxHeightReached = computed(() => cardHeight.value - 100 <= anotacoes.value.length * 150); // 150px é a altura estimada de cada item
  </script>
