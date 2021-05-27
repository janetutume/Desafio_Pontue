<template>
<div>
    <navUpper></navUpper>
    <b-message type="is-danger" class="is-hidden msg__error" has-icon>
        Redação não encontrada.
    </b-message>
    <img class="img__redaction" src="">
    <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true"></b-loading>
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

        let currentUrl = document.URL.split('?');
        if (currentUrl[1]) {
            this.openLoading();
            let redacaoId = currentUrl[1].split('=')[1];
            this.$http.get(
                'https://desafio.pontue.com.br/redacao/' + redacaoId, {
                    headers: {
                        'Authorization': this.getToken(),
                    }
                }
            ).then((response) => {
                let urlRedaction = response.body.data.urls[0].url;
                let imgRedaction = document.getElementsByClassName('img__redaction')[0];
                imgRedaction.src = urlRedaction;
                this.closeLoading();
            }).catch((error) => {
                this.closeLoading();
                let msgError = document.getElementsByClassName('msg__error')[0];
                msgError.classList.remove('is-hidden');
                msgError.classList.add('is-shown');

            });

        }
    },
    methods: {
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
            isFullPage: true
        }
    }
}
</script>

<style lang="sass">

</style>
