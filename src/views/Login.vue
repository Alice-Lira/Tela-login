<script setup>
import { reactive, ref, registerRuntimeCompiler } from 'vue';
import { useRouter, RouterLink } from 'vue-router'


const dados = reactive({
    email: '',
    senha: ''
})

const errorEmail = ref("")
const errorSenha = ref("")
const errorLogin = ref("")

const router = useRouter();


async function logar() {
    errorEmail.value = ''
    errorSenha.value = ''
    errorLogin.value = ''

    if (dados.email == null || dados.email == '') {
        errorEmail.value = 'Insira seu e-mail.'
    }
    if (dados.senha == null || dados.senha == '') {
        errorSenha.value = 'Insira sua senha.'
    }

    if (errorEmail.value != '' || errorSenha.value != '') {
        return
    }

    try {
        const req = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: dados.email,
                senha: dados.senha
            }),
        })

        const res = await req.json()
        if (req.status == 401) {
            errorLogin.value = res.mensagem
            return
        }
        if (req.status == 200) {
            router.push({ name: 'home' })
            return
        }
    } catch (erro) {
        console.log(erro.message)
    }

}

</script>

<template>
    <div class="container">
        <div class="fundo">

            <div class="fundo-titulo">
                <h1 class="titulo">Login</h1>
            </div>

            <form action="#" id="form" class="form">
                <div class="form-content">
                    <label for="email">E-mail:</label>
                    <input v-model="dados.email" type="text" placeholder=" Digite seu e-mail" id="email">
                    <p v-if="errorEmail" class="mensagemErro">{{ errorEmail }}</p>
                </div>

                <div class="form-content">
                    <label for="senha">Senha:</label>
                    <input v-model="dados.senha" type="password" placeholder="Digite sua senha" id="senha">
                    <p v-if="errorSenha" class="mensagemErro">{{ errorSenha }}</p>
                </div>

                <button @click="logar" class="botao" type="button">Acessar</button>
                <p v-if="errorLogin" class="mensagemErro">{{ errorLogin }}</p>

                <p class="textCadastro">Não tem conta? <RouterLink :to="{ name: 'cadastro' }">Cadastra-se</RouterLink>
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

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100vh;
    justify-content: center;
    background-color: #622dcc;
}


.form-content {
    display: flex;
    flex-direction: column;
    margin-bottom: 5px;
    padding-bottom: 10px;
}

.form-content input {
    width: 100%;
    padding: 8px;
    border-radius: 5px;
    margin-top: 5px;
    outline: none;
    border: #b9b5b5 solid 1px;
    background: rgb(244, 241, 241);

}

input[type=text]:focus {
    border: 2px solid #622dcc;
}

input[type=password]:focus {
    border: 2px solid #622dcc;
}

input::placeholder {
    color: rgb(157, 157, 157);
}

.form-content label {
    color: #0d2684;
    font-size: 14px;
}

.fundo {
    background-color: white;
    border-radius: 5px;
    width: 30%;
    box-shadow: 0 4px 6px -1px #021867;
}

.form {
    padding: 0 20px;
}

.titulo {
    margin-top: 20px;
    text-align: center;
    color: #0d2684;
    font-size: 25px;
    margin-bottom: 8px;
}

.botao {
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

.botao:hover {
    background-color: #c10449;
}

.botao-criar {
    margin-top: 20px;
    width: 100%;
    border-radius: 5px;
    border: 1px solid rgb(87, 85, 85);
    font-size: 14px;
    padding: 5px;
    color: rgb(120, 120, 120);
    background-color: rgb(221, 221, 221);
}

.textCadastro {
    margin-top: 20px;
    font-size: 14px;
    text-align: center;
    margin-bottom: 20px;
}

.mensagemErro {
    color: #ca0b0b;
    font-size: 13px;
    margin-top: 4px;
}
</style>
