<template lang="">
    <v-container>
        <h2 class="center-text">설문조사 주차별 리스트</h2>
        <div style="text-align: left; margin: 15px;">
            <router-link :to="{ name:'SurveyRegisterPage'}">
                게시물 작성
            </router-link>
            
        </div>
        <v-data-table
                v-model:item-per-page="perPage"
                :headers="headerTitle"
                :items="pageItems"
                v-model:pagination="pagination"
                class="elevation-1"
                @click:row="readRow"
                item-value="surveyId"/> 
            <v-pagination
                v-model="pagination.page"
                :length="Math.ceil(numberList.length / perPage)"
                color="primary"
                @input="updateItems"/>
    </v-container>
</template>

<script>
import { toRaw } from 'vue';
import {mapActions, mapState} from 'vuex'

const surveyModule = 'surveyModule'

export default{
    computed:{
        ...mapState(surveyModule, ['surveys']),
        pageItems(){
            
            const startIdx = (this.pagination.page - 1)*this.perPage
            const endIdx = startIdx + this.perPage
            return this.numberList.slice(startIdx, endIdx).map((id, index) => ({
                index: startIdx + index + 1,
                surveyId: id
            }))
        }
    },
    async mounted () {
        let numberList = await this.requestSurveyListToDjango()
        console.log("numberList:", numberList)
        this.numberList = numberList.surveyIdList
        this.numberList = toRaw(this.numberList)
    },
    methods: {
        ...mapActions(surveyModule, ['requestSurveyListToDjango']),
        readRow (event, { item }) {
            this.$router.push({
                name: 'SurveyReadPage',
                params: { surveyId: item.surveyId }
            })
        }
    },
    data(){
        return{
            headerTitle: [
                {
                    title: 'No',
                    align: 'start',
                    sortable: true,
                    key: 'index'
                },
                {
                    title: 'Survey ID',
                    align: 'start',
                    sortable: true,
                    key: 'surveyId'
                },
            ],
            perPage: 5,
            pagination: {
                page: 1,
            },
            numberList: [0],
        }
    }
}
</script>

<style>
.center-text {
  text-align: center;
}
</style>