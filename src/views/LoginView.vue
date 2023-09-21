<template>
  <div
    class="bg-[url('src/img/background.jpg')] h-screen bg-cover flex items-center justify-center"
  >
    <div
      class="bg-gradient-to-r from-sky-500 to-indigo-500 w-3/5 flex items-center justify-center flex-col flex-wrap space-y-4 p-4 rounded-lg"
    >
      <!-- Card de Login -->
      <div v-if="!isCadastro">
        <label for="email" class="text-white text-xl font-mono">EMAIL:</label>
        <div class="bg-white w-full h-10 rounded-lg">
          <input
            type="text"
            id="email"
            placeholder="Digite seu email"
            class="w-full h-full p-2 rounded-lg"
          />
        </div>
        <label for="senha" class="text-white text-xl font-mono">SENHA:</label>
        <div class="bg-white w-full h-10 rounded-lg">
          <input
            type="password"
            id="senha"
            placeholder="Digite sua senha"
            class="w-full h-full p-2 rounded-lg"
          />
        </div>
        <button
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
          @click="isCadastro = true"
        >
          Entrar
        </button>
        <p class="text-white">
          Ainda não tem cadastro?
          <router-link to="/registro" class="text-red-900 font-mono font-bold"
            >Crie uma conta</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>
<script setup></script>
