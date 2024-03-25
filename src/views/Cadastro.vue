<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router'

const dados = reactive({
    nome: null,
    email: null,
    senha: null,
    confirmarSenha: null
})

const router = useRouter();

const errorNome = ref("")
const errorEmail = ref("")
const errorSenha = ref("")
const errorCadastro = ref("")

async function cadastrar() {
    errorNome.value = ''
    errorEmail.value = ''
    errorSenha.value = ''
    errorCadastro.value = ''

    if (dados.nome == null || dados.nome == '') {
        errorNome.value = 'Insira seu nome.'
    }

    if (dados.email == null || dados.email == '') {
        errorEmail.value = 'Insira seu e-mail.'
    }

    if (dados.senha == null || dados.senha == '') {
        errorSenha.value = 'Insira sua senha.'
    }
    if (dados.senha !== dados.confirmarSenha) {
        errorSenha.value = 'Confirmar senha precisa ser igual senha.'
    }
    if (errorNome.value != '' || errorEmail.value != '' || errorSenha.value != '') {
        return
    }


    const req = await fetch('http://localhost:3000/usuario', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: dados.nome,
            email: dados.email,
            senha: dados.senha,
            confirmarSenha: dados.confirmarSenha
        }),
    })

    const res = await req.json()
    if (req.status == 400) {
        errorCadastro.value = res.mensagem
        return
    }

    if (req.status == 201) {
        router.push({ name: 'login' })
        return
    }

}

</script>
<template>
    <div class="contem-tudo">
        <div class="tela-fundo">

            <div>
                <h1 class="txt">Cria sua conta</h1>
            </div>

            <form action="#" id="form" class="formulario">

                <input v-model="dados.nome" type="text" placeholder=" Nome" class="form-input">
                <p v-if="errorNome" class="mensagem-erro">{{ errorNome }}</p>

                <input v-model="dados.email" type="text" placeholder=" E-mail" class="form-input">
                <p v-if="errorEmail" class="mensagem-erro">{{ errorEmail }}</p>

                <input v-model="dados.senha" type="password" placeholder="Senha" class="form-input">
                <p v-if="errorSenha" class="mensagem-erro">{{ errorSenha }}</p>

                <input v-model="dados.confirmarSenha" type="password" placeholder="Confirmar senha" class="form-input">
                <p v-if="errorSenha" class="mensagem-erro">{{ errorSenha }}</p>

                <button @click="cadastrar" class="botao-cadastrar" type="button">Cadastrar</button>
                <p v-if="errorCadastro" class="mensagem-erro">{{ errorCadastro }}</p>

                <p class="textLogin">Já tem uma conta? <RouterLink :to="{ name: 'login' }">Entrar</RouterLink>
                </p>

            </form>

        </div>
    </div>
</template>


<style scoped>
* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: Arial, Helvetica, sans-serif;
}

.contem-tudo {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    justify-content: center;
    background-color: #622dcc;
}

.tela-fundo {
    background-color: white;
    border-radius: 5px;
    width: 30%;
    box-shadow: 0 4px 6px -1px #021867;
}


.form-input {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    border: 2px solid #d3d3d3;
    margin-top: 12px;
    outline: none;
    border: #b9b5b5 solid 1px;
    background: rgb(244, 241, 241);

}

input::placeholder {
    color: rgb(157, 157, 157);
}

.formulario {
    padding: 0 20px;
}

.txt {
    margin-top: 20px;
    text-align: center;
    color: #0d2684;
    font-size: 25px;
    margin-bottom: 8px;
}

.botao-cadastrar {
    background-color: #ee4c87;
    color: white;
    width: 100%;
    border-radius: 5px;
    padding: 8px;
    border: 0;
    font-size: 15px;
    cursor: pointer;
    margin-top: 15px;
    font-weight: bold;
}


.botao-cadastrar:hover {
    background-color: #c10449;
}

.textLogin {
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
    margin-bottom: 20px;
}

.mensagem-erro {
    color: #ca0b0b;
    font-size: 13px;
    margin-top: 4px;

}
</style>