<script setup>
import { useRouter, RouterLink } from 'vue-router'

const router = useRouter();

function entrar() {
    router.push({ name: 'login' });
}

</script>
<template>
    <div class="container">

        <div class="fundo">
            <h1 class="titulo">Bem-vindos!</h1>
            <p class="mensagem">Acesse sua conta agora</p>
            <button @click="entrar" type="button" class="botao">Entrar</button>
        </div>
    </div>
</template>


<style  scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
}

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    justify-content: center;
    background-color: #622dcc;
}

.fundo {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.titulo {
    color: white;
    font-size: 25px;
}

.mensagem {
    color: white;
    font-size: 12px;
    margin-top: 10px;
    text-align: center;
}

.botao {
    background-color: #ee4c87;
    color: white;
    width: 50%;
    border-radius: 5px;
    padding: 8px;
    border: 1px solid white;
    font-size: 14px;
    cursor: pointer;
    margin-top: 15px;

}

.botao:hover {
    background-color: #c10449;
}
</style>