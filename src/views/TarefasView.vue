<template>
    <div class="min-h-screen flex-col flex font-mukta bg-repeat bg-cover bg-[url('/img/background.jpg')]">
      <TheSidebar></TheSidebar>
      <div class="flex justify-center items-center">
        <div class="max-w-lg w-11/12 h-full mb-5 p-8 bg-white rounded-lg shadow-md relative mt-5">
          <h1 class="text-3xl font-semibold text-blue-600 mb-4 flex justify-center">Agenda de Tarefas</h1>
          <div class="mb-4">
            <input
              v-model="novaTarefa.titulo"
              class="w-full p-2 border rounded shadow-md"
              placeholder="Título da Tarefa"
            />
          </div>
          <div class="mb-4">
            <textarea
              v-model="novaTarefa.conteudo"
              class="w-full p-2 border rounded shadow-md"
              placeholder="Descrição da Tarefa"
            ></textarea>
          </div>
          <div class="mb-4">
            <label>Data de Entrega:</label>
            <input
              type="date"
              v-model="novaTarefa.dataEntrega"
              class="w-full p-2 border rounded shadow-md"
            />
          </div>
          <div class="mb-4">
            <button @click="adicionarTarefa" class="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
              Adicionar Tarefa
            </button>
          </div>
          <div class="tarefas" :style="{ 'max-height': cardHeight + 'px' }">
            <div class="tarefas-content" :style="{ 'max-height': cardHeight - 100 + 'px', 'overflow-y': maxHeightReached ? 'auto' : 'visible' }">
              <div v-for="(tarefa, index) in tarefas" :key="index" class="mb-4 border p-4 rounded shadow-md">
                <h2 class="text-xl font-semibold text-blue-600">{{ tarefa.titulo }}</h2>
                <p class="text-gray-700">{{ tarefa.conteudo }}</p>
                <p><strong>Data de Entrega:</strong> {{ tarefa.dataEntrega }}</p>
                <label class="mt-2 flex items-center">
                  <input
                    type="checkbox"
                    v-model="tarefa.concluida"
                    class="mr-2 border rounded"
                  />
                  Concluída
                </label>
                <button @click="removerTarefa(index)" class="bg-red-600 text-white py-1 px-2 mt-2 rounded hover:bg-red-700">
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from "vue";
  import TheSidebar from "../components/TheSidebar.vue";
  
  const novaTarefa = ref({
    titulo: "",
    conteudo: "",
    dataEntrega: "",
    concluida: false,
  });
  
  const tarefas = ref([]);
  
  const adicionarTarefa = () => {
    tarefas.value.push({ ...novaTarefa.value });
    novaTarefa.value = {
      titulo: "",
      conteudo: "",
      dataEntrega: "",
      concluida: false,
    };
    salvarTarefasNoLocalStorage();
  };
  
  const removerTarefa = (index) => {
    tarefas.value.splice(index, 1);
    salvarTarefasNoLocalStorage();
  };
  
  const salvarTarefasNoLocalStorage = () => {
    localStorage.setItem("tarefas", JSON.stringify(tarefas.value));
  };
  
  const carregarTarefasDoLocalStorage = () => {
    const tarefasSalvas = localStorage.getItem("tarefas");
    if (tarefasSalvas) {
      tarefas.value = JSON.parse(tarefasSalvas);
    }
  };
  
  onMounted(() => {
    carregarTarefasDoLocalStorage();
  });
  
  // Calcula a altura máxima com base na altura da janela
  const cardHeight = computed(() => window.innerHeight - 200); // Ajuste conforme necessário
  const maxHeightReached = computed(() => cardHeight.value - 100 <= tarefas.value.length * 150); // 150px é a altura estimada de cada item
  </script>
  