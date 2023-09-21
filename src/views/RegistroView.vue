<template>
    <div class="bg-[url('src/img/background.jpg')] h-screen bg-cover flex items-center justify-center">
      <div class="bg-gradient-to-r from-sky-500 to-indigo-500 w-3/5 flex items-center justify-center flex-col flex-wrap space-y-4 p-4 rounded-lg">
        <label for="celular" class="text-white text-xl font-mono">Número de Celular:</label>
        <div class="bg-white w-full h-10 rounded-lg">
          <input type="text" id="celular" placeholder="Digite seu número de celular" class="w-full h-full p-2 rounded-lg" />
        </div>
        <label for="emailCadastro" class="text-white text-xl font-mono">EMAIL:</label>
        <div class="bg-white w-full h-10 rounded-lg">
          <input type="text" id="emailCadastro" placeholder="Digite seu email" class="w-full h-full p-2 rounded-lg" />
        </div>
        <label for="senhaCadastro" class="text-white text-xl font-mono">Criar Senha:</label>
        <div class="bg-white w-full h-10 rounded-lg">
          <input type="password" id="senhaCadastro" placeholder="Crie uma senha" class="w-full h-full p-2 rounded-lg" />
        </div>
        <label for="idade" class="text-white text-xl font-mono">Confirmar Senha:</label>
        <div class="bg-white w-full h-10 rounded-lg">
          <input type="text" id="idade" placeholder="Digite sua idade" class="w-full h-full p-2 rounded-lg" />
        </div>
        <button
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
          @click="isCadastro = false"
        >
          Cadastrar
        </button>
        <p class="text-white">
         Já tem uma conta?
          <router-link to="/" class="text-red-900 font-mono font-bold"
            >Faça login</router-link
          ></p>
      </div>
    </div>
  </template>
  
  <script setup>
    let isCadastro = true;
  </script>
  