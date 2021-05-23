<template>
<div>
    <div class="login">
        <h1 class="title"> Login </h1>
        <form method="post" action="https://desafio.pontue.com.br/auth/login">
            <b-field label="E-mail">
                <b-input v-model="email" name="email"></b-input>
            </b-field>

            <b-field label="Senha">
                <b-input type="password" name="password" password-reveal>
                </b-input>
            </b-field>

            <section>
                <b-field position="is-centered" grouped>
                    <b-button ref="submit" type="is-primary" @click="sendForm" style="margin: 1rem;">
                        Entrar
                    </b-button>
                </b-field>
            </section>
        </form>
    </div>
    <b-message class="msg__erro is-hidden" type="is-danger" has-icon>
        E-mail ou senha inválidos!
    </b-message>
    <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true"></b-loading>
</div>
</template>

<script>
export default {

    methods: {
        sendForm() {
            this.openLoading();
            this.$http.post(
                'https://desafio.pontue.com.br/auth/login',
                new FormData(document.querySelector("form")),
            ).then((response) => {
                localStorage.setItem('token', response.body.access_token);
                localStorage.setItem('alunoId', response.body.aluno_id);
                response.json();
                this.closeLoading();
                debugger
                if (response.body.aluno_id) {
                    window.location.href = window.location.origin + '/#/list/';
                } else {
                     window.location.href = window.location.origin + '/#/adminlist/';
                }
            }).catch((error) => {
                let msgErro = document.getElementsByClassName('msg__erro')[0];
                msgErro.classList.remove('is-hidden');
                msgErro.classList.add('is-shown');
                this.closeLoading();
                setTimeout(function () {
                    msgErro.classList.remove('is-shown');
                    msgErro.classList.add('is-hidden');
                }, 3000)
            })
        },

        openLoading() {
            this.isLoading = true;
        },
        closeLoading() {
            this.isLoading = false;
        }

    },

    created() {
        if (localStorage.getItem('token')) {
            window.location.href = window.location.origin + '/#/';
        }
    },

    data() {
        return {
            isLoading: false,
            isFullPage: true
        }
    }

}
</script>

<style lang="scss">
.login {
    width: 50%;
    height: 70%;
    margin: 10% auto;
    padding: 1rem;
    border: 1px solid #7957d5;
    border-radius: 0.5rem;

    h1 {
        text-align: center;
    }
}
</style>
