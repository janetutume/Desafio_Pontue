<template>
<b-navbar class="nav-upper" >
    <template  #start>
        <b-navbar-item class="nav-link" :href=getListUrl()>
            Redações
        </b-navbar-item>
        <b-navbar-item class="nav-link" :href=getAddUrl()>
            Criar Redações
        </b-navbar-item>
    </template>
    <template #end>
        <b-navbar-item tag="div">
            <div class="buttons">
                <b-button type="is-primary" @click="logout" outlined>Sair</b-button>
            </div>
        </b-navbar-item>
    </template>
</b-navbar>
</template>

<script>
export default {
    methods: {
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('alunoId');
            window.location.href = window.location.origin + '/#/';
        },
        getAddUrl() {
            return window.location.origin + '/#/view';
        },
        getListUrl() {
            return window.location.origin + '/#/list';
        }
    }
}
</script>

<style lang="scss">

.nav-upper {
    margin-bottom: 2rem;
    margin-top: 1rem;
}

.nav-link {
    font-size: 1.25rem;
}


</style>
