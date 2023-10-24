<template>
  <div
    class="min-h-screen flex-col flex font-mukta bg-repeat bg-cover bg-[url('/img/background.jpg')] text-center items-center object-center justify-center"
  >

    <div
      class=" bg-gradient-to-r from-sky-500 to-indigo-500 w-3/5 flex space-y-4 p-5 mt-5 mb-5"
    >
      <!-- Card de Login -->
      <div class="flex content-center flex-wrap text-center justify-center" v-if="!isCadastro">
        <label for="email" class="text-white text-xl font-mono">EMAIL:</label>
        <div class="bg-white w-full h-10 rounded-lg">
          <input
            type="text"
            id="email"
            v-model="user.email"
            placeholder="Digite seu email"
            class="w-full h-full p-2 rounded-lg"
          />
        </div>
        <label for="senha" class="text-white text-xl font-mono">SENHA:</label>
        <div class="bg-white w-full h-10 rounded-lg">
          <input
            type="password"
            id="senha"
            v-model="user.senha"
            placeholder="Digite sua senha"
            class="w-full h-full p-2 rounded-lg"
          />
        </div>
        <button
          class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
          @click="fazerLogin"
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

<script setup>
import { ref } from 'vue';
import router from '@/router/index.js'; 

const isCadastro = ref(false);
const user = {
  email: '',
  senha: '',
};

function fazerLogin() {
  // Simulação de validação de login (substitua por sua lógica real)
  const usuariosCadastrados = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuarioEncontrado = usuariosCadastrados.find(u => u.email === user.email && u.senha === user.senha);

  if (usuarioEncontrado) {
    // Armazenar os dados do usuário no Local Storage
    localStorage.setItem('user', JSON.stringify(usuarioEncontrado));

    router.push('/home');
  } else {
    alert('Credenciais incorretas. Tente novamente.');
  }
}

</script>
