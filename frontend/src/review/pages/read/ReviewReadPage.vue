<template>
    <div v-if="isSelectionReview">
        <div>
            <h2>{{ this.reviewTitle }}</h2>
            <p><strong>디자인:</strong> ★{{ this.designScore }} </p>
            <p><strong>사용성:</strong> ★{{ this.usabilityScore }} </p>
            <p><strong>응답성:</strong> ★{{ this.responsiveScore }} </p>
            <p><strong>AI 답변 퀄리티:</strong> ★{{ this.qualityScore }} </p>
            <p><strong>리뷰 내용:</strong> {{ this.reviewContent }}</p>
        </div>
    </div>
    <div v-else>
        <div>
            <h2>{{ this.reviewTitle }}</h2>
            <p><strong>리뷰 내용:</strong> {{ this.reviewContent }}</p>
        </div>
    </div>
    <button @click="goToReviewListPage()">목록으로 돌아가기</button>


</template>

<script>
import { mapActions } from 'vuex';

const reviewModule = 'reviewModule'

export default {
    props: {
        id: {
            type: Number,
            required: true,
        }
    },
    data() {
        return {
            isSelectionReview: true,
            reviewTitle: '제목제목제목제목제목',
            reviewWriter: '',
            reviewContent: '???',
            designScore: 2,
            usabilityScore: 3,
            qualityScore: 4,
            responsiveScore: 5,
        }
    },
    async mounted() {
        await this.getReviewData()
    },
    methods: {
        ...mapActions(reviewModule, []),

        async getReviewData() {
            console.log("review 정보 들고오기")
        },
        goToReviewListPage() {
            this.$router.push("/review/list")
        }
    },
    created() {
        alert("현재 구현중인 페이지입니다. 제대로 동작하지 않을 수 있습니다.");
    }
}
</script>

<style scoped>
button {
    display: flex;
    padding: 10px 15px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    position: absolute;
    right: 20px;
}

button:hover {
    background-color: #0056b3;
}
</style>