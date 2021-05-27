<template>
<div>
    <b-navbar class="nav-upper">
        <template #end>
            <b-navbar-item tag="div">
                <div class="buttons">
                    <b-button type="is-primary" @click="logout" outlined>Sair</b-button>
                </div>
            </b-navbar-item>
        </template>
    </b-navbar>

    <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true"></b-loading>

    <b-table :data="isEmpty ? [] : redacoes" :bordered="isBordered" :striped="isStriped" :narrowed="isNarrowed" :hoverable="isHoverable" :loading="isLoading" :focusable="isFocusable" :mobile-cards="hasMobileCards">

        <b-table-column field="nome_completo" label="Aluno" :td-attrs="columnTdAttrs" v-slot="props">
            {{ props.row.aluno.nome_completo }}
        </b-table-column>

        <b-table-column field="turma" label="Turma" :td-attrs="columnTdAttrs" v-slot="props">
            {{ props.row.aluno.turma.nome }}
        </b-table-column>

        <b-table-column field="escola" label="Escola" :td-attrs="columnTdAttrs" v-slot="props">
            {{ props.row.escola.nome }}
        </b-table-column>

        <b-table-column field="numero" label="Número" :td-attrs="columnTdAttrs" v-slot="props">
            {{ props.row.numero }}
        </b-table-column>

        <b-table-column field="created_at" label="Criado em:" :td-attrs="columnTdAttrs" v-slot="props">
            {{ formatDate(props.row.created_at)}}
        </b-table-column>
    </b-table>
</div>
</template>

<script>
export default {

    data() {
        return {
            redacoes: [],
            isLoading: false,
            isFullPage: true,
            isEmpty: false,
            isBordered: false,
            isStriped: false,
            isNarrowed: false,
            isHoverable: false,
            isFocusable: false,
            hasMobileCards: true
        }
    },

    methods: {
        formatDate(date) {
            let dateSplited = date.split(' ');
            let formatedDate = dateSplited[0].split('-');

            return formatedDate[2] + '/' + formatedDate[1] + '/' + formatedDate[0];
        },
        getToken() {
            return 'Bearer ' + localStorage.getItem('token');
        },
        openLoading() {
            this.isLoading = true;
        },
        closeLoading() {
            this.isLoading = false;
        },
        logout() {
            localStorage.removeItem('token');
            localStorage.removeItem('alunoId');
            window.location.href = window.location.origin + '/#/';
        },
        columnTdAttrs(row, column) {
            if (row.id === 'Total') {
                if (column.label === 'ID') {
                    return {
                        colspan: 4,
                        class: 'has-text-weight-bold',
                        style: {
                            'text-align': 'left !important'
                        }
                    }
                } else if (column.label === 'Gender') {
                    return {
                        class: 'has-text-weight-semibold'
                    }
                } else {
                    return {
                        style: {
                            display: 'none'
                        }
                    }
                }
            }
            return null
        },
    },

    created() {
        if (!localStorage.getItem('token')) {
            window.location.href = window.location.origin + '/#/';
        }

        this.openLoading();
        this.$http.get(
            'https://desafio.pontue.com.br/index/admin/', {
                headers: {
                    'Authorization': this.getToken()
                }
            }
        ).then((response) => {
            this.closeLoading();
            this.redacoes = response.body.data;
        }).catch((error) => {
            this.closeLoading();
        });
    },

}
</script>
