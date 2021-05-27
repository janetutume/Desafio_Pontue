<template>
<div>
    <navUpper></navUpper>
    <b-message type="is-danger" class="is-hidden msg__error" has-icon>
        Não foi possível salvar a sua redação, por favor tente mais tarde.
    </b-message>
    <b-message type="is-success" class="is-hidden msg__save" has-icon>
        Redacão salva com sucesso!
    </b-message>
    <form>

        <b-field class="file is-primary" :class="{'has-name': !!file}">
            <b-upload v-model="file" class="file-label" name="file[]">
                <span class="file-cta">
                    <b-icon class="file-icon" icon="upload"></b-icon>
                    <span class="file-label">Click to upload</span>
                </span>
                <span class="file-name" v-if="file">
                    {{ file.name }}
                </span>
            </b-upload>
        </b-field>
        <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true"></b-loading>
        <input name="urls[]" id="urlId" disabled hidden>
        <b-button type="is-success" @click="saveRedaction">Salvar</b-button>

    </form>

</div>
</template>

<script>
import NavUpper from '../components/NavUpper.vue';
export default {
    components: {
        'navUpper': NavUpper
    },

    created() {
        if (!localStorage.getItem('token')) {
            window.location.href = window.location.origin + '/#/';
        }

        window.onload = () => {
            let currentUrl = document.URL.split('?');
            if (currentUrl[1]) {
                this.openLoading();
                let redacaoId = currentUrl[1].split('=')[1];
                let urlIdInput = document.getElementById('urlId');
                urlIdInput.disabled = false;

                this.$http.get(
                    'https://desafio.pontue.com.br/redacao/' + redacaoId, {
                        headers: {
                            'Authorization': this.getToken(),
                        }
                    }
                ).then((response) => {
                    this.closeLoading();
                    urlIdInput.value = response.body.data.urls[0].url
                }).catch((error) => {
                    this.closeLoading();
                });
            }
        };
    },

    methods: {
        saveRedaction() {
            this.openLoading();
            let currentUrl = document.URL.split('?');
             let urlIdInput = document.getElementById('urlId');
            if (currentUrl[1]) {
                let redacaoId = currentUrl[1].split('=')[1];
                this.$http.post(
                    'https://desafio.pontue.com.br/redacao/' + redacaoId + '/update',
                    new FormData(document.querySelector("form")), {
                        headers: {
                            'Authorization': this.getToken(),
                            'X-Requested-With': 'XMLHttpRequest'
                        }
                    }
                ).then((response) => {
                    this.closeLoading();
                     urlIdInput.value = response.body.data.urls[0].url;
                    this.redacoes = response.body.data;
                }).catch((error) => {
                    this.closeLoading();
                });
            } else {
                this.$http.post(
                    'https://desafio.pontue.com.br/alunos/redacao/create',
                    new FormData(document.querySelector("form")), {
                        headers: {
                            'Authorization': this.getToken(),
                            'X-Requested-With': 'XMLHttpRequest',
                        }
                    }
                ).then((response) => {
                    this.closeLoading();
                    response.json();
                    let msgSave = document.getElementsByClassName('msg__save')[0];
                    msgSave.classList.remove('is-hidden');
                    msgSave.classList.add('is-shown');
                    setTimeout(function () {
                        msgSave.classList.remove('is-shown');
                        msgSave.classList.add('is-hidden');
                        window.location.href = window.location.origin + '/#/list/';
                    }, 3000);
                }).catch((error) => {
                    this.closeLoading();
                    let msgError = document.getElementsByClassName('msg__error')[0];
                    msgError.classList.remove('is-hidden');
                    msgError.classList.add('is-shown');
                    setTimeout(function () {
                        msgError.classList.remove('is-shown');
                        msgError.classList.add('is-hidden');
                        window.location.reload();
                    }, 3000);
                });
            }
        },
        getToken() {
            return 'Bearer ' + localStorage.getItem('token');
        },
        openLoading() {
            this.isLoading = true;
        },
        closeLoading() {
            this.isLoading = false;
        }

    },

    data() {
        return {
            isLoading: false,
            isFullPage: true,
            file: null
        }
    }

}
</script>

<style>
</style>
