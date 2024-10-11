<template lang="">
    <v-container>
        <h2 class="center-text">결과 보고서 목록</h2>
        
        <v-data-table
                v-model:item-per-page="perPage"
                :headers="headerTitle"
                :items="pageItems"
                v-model:pagination="pagination"
                class="elevation-1"
                @click:row="readRow"
                item-value="resultReportId"/> 
            <v-pagination
                v-model="pagination.page"
                :length="Math.ceil(reports.length / perPage)"
                color="primary"
                @input="updateItems"/>
    </v-container>
</template>

<script>
import {mapActions, mapState} from 'vuex'

const resultReportModule = 'resultReportModule'

export default{
    computed:{
        ...mapState(resultReportModule, ['resultReports']),
        pageItems() {
            const startIdx = (this.pagination.page - 1)*this.perPage
            const endIdx = startIdx + this.perPage
            return this.resultReports.slice(startIdx, endIdx)
        }
    },
    mounted() {
        this.requestResultReportToDjango()
    },
    methods: {
        ...mapActions(resultReportModule, ['requestResultReportListToDjango']),
        readRow (event, { item }) {
            this.$router.push({
                name: 'ResultReportReadPage',
                params: { resultReportId: item['resultReportId'].toString() }
            })
        }
    },
    data() {
        return{
            headerTitle: [
                {title: 'No', align: 'start', sortable: true, key: 'resultReportId'},
                {title: '제목', align: 'end', key: 'title'},
                {title: '작성자', align: 'end', key: 'writer'},
                {title: '작성일자', align: 'end', key: 'regDate'},
            ],
            perPage: 5,
            pagination: {
                page: 1
            }
        }
    }
}

</script>