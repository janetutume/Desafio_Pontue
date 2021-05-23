<template>
<div>
    <navUpper></navUpper>
    <b-message class="is-hidden msg__delete" type="is-success" has-icon>
        Redação deletada com sucesso.
    </b-message>
    <b-loading :is-full-page="isFullPage" v-model="isLoading" :can-cancel="true"></b-loading>

    <b-table :data="isEmpty ? [] : redacoes" :bordered="isBordered" :striped="isStriped" :narrowed="isNarrowed" :hoverable="isHoverable" :loading="isLoading" :focusable="isFocusable" :mobile-cards="hasMobileCards">

        <b-table-column field="id" label="ID" :td-attrs="columnTdAttrs" v-slot="props">
            {{ props.row.id }}
        </b-table-column>

        <b-table-column field="numero" label="Número" :td-attrs="columnTdAttrs" v-slot="props">
            {{ props.row.numero }}
        </b-table-column>

        <b-table-column field="created_at" label="Criado em:" :td-attrs="columnTdAttrs" v-slot="props">
            {{ formatDate(props.row.created_at)}}
        </b-table-column>

        <b-table-column field="edit" :td-attrs="columnTdAttrs" v-slot="props">
            <a :href=getEditUrl(props.row.id)>
                <b-button type="is-dark" :href=getEditUrl(props.row.id) outlined>Editar</b-button>
            </a>

            <b-button type="is-danger" @click="getDelete(props.row.id)" outlined>Deletar</b-button>
        </b-table-column>
    </b-table>
</div>
</template>

<script>
import NavUpper from '../components/NavUpper.vue';
export default {
    components: {
        'navUpper': NavUpper
    },
    data() {
        return {
            redacoes: [],
            isLoading: false,
            isFullPage: true
        }
    },
    methods: {
        formatDate(date) {
            let dateSplited = date.split(' ');
            let formatedDate = dateSplited[0].split('-');

            return formatedDate[2] + '/' + formatedDate[1] + '/' + formatedDate[0];
        },
        getDelete(id) {
            if (!confirm('Realmente deseja deletar essa redação?')) {
                return;
            }
            this.$http.delete(
                'https://desafio.pontue.com.br/redacao/' + id + '/delete', {
                    headers: {
                        'Authorization': this.getToken()
                    }
                }
            ).then((response) => {
                let msgDelete = document.getElementsByClassName('msg__delete')[0];
                msgDelete.classList.remove('is-hidden');
                msgDelete.classList.add('is-shown');
                setTimeout(function () {
                    msgDelete.classList.remove('is-shown');
                    msgDelete.classList.add('is-hidden');
                    window.location.reload();
                }, 3000)
            });
        },
        getEditUrl(id) {
              return window.location.origin + '/#/view/?id='+id;
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

    created() {
        if (!localStorage.getItem('token')) {
            window.location.href = window.location.origin + '/#/';
        }

        let idAluno = localStorage.getItem('alunoId');
        this.openLoading();
        this.$http.get(
            'https://desafio.pontue.com.br/index/aluno/' + idAluno, {
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

