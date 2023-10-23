<template>
  <div class="bg-[url('public/img/background.jpg')] h-screen bg-cover flex items-center justify-center">
    <div class="bg-gradient-to-r from-sky-500 to-indigo-500 w-3/5 flex items-center justify-center flex-col flex-wrap space-y-4 p-4 rounded-lg">
      <label for="emailCadastro" class="text-white text-xl font-mono">EMAIL:</label>
      <div class="bg-white w-full h-10 rounded-lg">
        <input type="text" id="emailCadastro" v-model="user.email" placeholder="Digite seu email" class="w-full h-full p-2 rounded-lg" />
      </div>
      <label for="senhaCadastro" class="text-white text-xl font-mono">Senha:</label>
      <div class="bg-white w-full h-10 rounded-lg">
        <input type="password" id="senhaCadastro" v-model="user.senha" placeholder="Crie uma senha" class="w-full h-full p-2 rounded-lg" />
      </div>
      <label for="confirmarSenha" class="text-white text-xl font-mono">Confirmar Senha:</label>
      <div class="bg-white w-full h-10 rounded-lg">
        <input type="password" id="confirmarSenha" v-model="confirmarSenha" placeholder="Confirme sua senha" class="w-full h-full p-2 rounded-lg" />
      </div>
      <button
        class="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg mt-2"
        @click="cadastrarUsuario"
      >
        Cadastrar
      </button>
      <p class="text-white">
        Já tem uma conta?
        <router-link to="/" class="text-red-900 font-mono font-bold">Faça login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import router from "@/router/index.js";

const user = {
  email: "",
  senha: "",
};

let confirmarSenha = "";

function cadastrarUsuario() {
  if (validarCampos()) {
    // Armazenar o novo usuário no Local Storage
    const usuariosCadastrados =
      JSON.parse(localStorage.getItem("usuarios")) || [];
    usuariosCadastrados.push(user);
    localStorage.setItem("usuarios", JSON.stringify(usuariosCadastrados));

    // Redirecionar para a página de login após o cadastro bem-sucedido
    router.push("/");
  }
}

function validarCampos() {
  if (!user.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
    alert("Email inválido. Insira um email válido.");
    return false;
  }

  if (user.senha !== confirmarSenha) {
    alert("As senhas não coincidem. Por favor, verifique.");
    return false;
  }

  return true;
}
</script>
