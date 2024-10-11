<template>
    <v-container>
        <h2> Review </h2>

        <!-- 리뷰 목록 테이블 -->
        <v-data-table v-model:items-per-page.sync="perPage" :headers="headerTitle" :items="pagedItems"
            :pagination="pagination" class="elevation-1" @click:row="readRow" item-value="reviewId"
            :items-per-page-options="perPageOptions" :pageText="prompt" />

        <!-- 페이지네이션 -->
        <v-pagination v-model="pagination" :length="totalPages" color="primary" @input="updateItems"
            :total-visible="5" />

        <!-- 리뷰 작성 버튼 -->
        <div style="text-align: right; margin: 15px;">
            <router-link to="/review/register" style="align-items: right;">
                게시물 작성
            </router-link>
        </div>
    </v-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const reviewModule = 'reviewModule'

export default {
    components: {},
    computed: {
        // Vuex 상태 매핑
        ...mapState(reviewModule, ['reviewList']),

        // 전체 페이지 수 계산
        totalPages() {
            return Math.ceil(this.reviewList / this.perPage);
        },

    },
    async mounted() {
        this.reviewList = await this.requestEntireReviewListCount();
        const payload = { 'pagination': this.pagination, 'perPage': this.perPage }
        this.pagedItems = await this.requestReviewListToDjango(payload);
        this.prompt = `${this.perPage * (this.pagination - 1) + 1}-${this.perPage * (this.pagination - 1) + this.pagedItems.length} of ${this.reviewList}`

    },
    methods: {
        // Vuex 액션 매핑
        ...mapActions(reviewModule, ['requestReviewListToDjango', 'requestEntireReviewListCount']),

        // 테이블 행 클릭 시 리뷰 읽기 페이지로 이동
        readRow(event, { item }) {
            console.log('item :', item);
            this.$router.push(`/review/read/${item.id}`);
        },

        // 페이지가 변경될 때 아이템 업데이트
        async updateItems() {
            // 페이지 변경에 따른 추가 로직 필요시 여기에 작성
            console.log('updateLogic is started')
            const payload = { 'pagination': this.pagination, 'perPage': this.perPage }
            this.pagedItems = await this.requestReviewListToDjango(payload);
            console.log('페이지 변경: ', this.pagination);
            this.prompt = `${this.perPage * (this.pagination - 1) + 1}-${this.perPage * (this.pagination - 1) + this.pagedItems.length} of ${this.reviewList}`
        },
    },
    watch: {
        perPage() {
            this.pagination = 1;
            this.updateItems();
        },
        pagination(index) {
            this.pagination = index;
            this.updateItems();
        }
    },
    data() {
        return {
            // 테이블 헤더 설정
            headerTitle: [
                { text: '작성자', align: 'start', value: 'writer' },
                { text: '제목', align: 'middle', value: 'title' },
                { text: '작성일자', align: 'end', value: 'regDate' }
            ],
            perPage: 10, // 페이지당 항목 수
            pagination: 1,
            reviewList: 0,
            pagedItems: [],
            perPageOptions: [
                { value: 10, title: '10' },
                { value: 25, title: '25' },
                { value: 50, title: '50' },
            ],
            prompt: `` // 초기값 설정
        };
    }
}
</script>

<style scoped>
h2 {
    margin-bottom: 20px;
}
</style>
