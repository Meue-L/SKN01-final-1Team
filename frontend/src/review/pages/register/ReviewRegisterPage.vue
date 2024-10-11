<template>
    <div class="review-page">

        <!-- 토글 스위치 -->
        <div class="title">
            <div>
                <h1>리뷰 작성 페이지</h1>
            </div>
            <div class="switch white">
                <input type="radio" id="switch-off" v-model="isChecked" :value="false" />
                <input type="radio" id="switch-on" v-model="isChecked" :value="true" />
                <label for="switch-off">Selection Form</label>
                <label for="switch-on">Free Form</label>
                <span class="toggle" :class="{ 'checked': isChecked }"></span>
            </div>
        </div>

        <!-- selection Review Template -->
        <div v-if="!isChecked" class="review-template status-template">
            <form @submit.prevent="submitReview">
                <div class="inner">
                    <v-text class="question-text">디자인</v-text>
                    <div class="star-rating">
                        <div class="star" v-for="index in 5" :key="index" @click="check('design', index)">
                            <span v-if="index - 1 < designScore">★</span>
                            <span v-if="index - 1 >= designScore">☆</span>
                        </div>
                    </div>
                </div>
                <div class="inner">
                    <v-text class="question-text">사용성</v-text>
                    <div class="star-rating">
                        <div class="star" v-for="index in 5" :key="index" @click="check('usability', index)">
                            <span v-if="index - 1 < usabilityScore">★</span>
                            <span v-if="index - 1 >= usabilityScore">☆</span>
                        </div>
                    </div>
                </div>
                <div class="inner">
                    <v-text class="question-text">응답성</v-text>
                    <div class="star-rating">
                        <div class="star" v-for="index in 5" :key="index" @click="check('responsive', index)">
                            <span v-if="index - 1 < responsiveScore">★</span>
                            <span v-if="index - 1 >= responsiveScore">☆</span>
                        </div>
                    </div>
                </div>
                <div class="inner">
                    <v-text class="question-text">AI가 생성한 답변의 퀄리티</v-text>
                    <div class="star-rating">
                        <div class="star" v-for="index in 5" :key="index" @click="check('quality', index)">
                            <span v-if="index - 1 < qualityScore">★</span>
                            <span v-if="index - 1 >= qualityScore">☆</span>
                        </div>
                    </div>
                </div>
                <v-text class="question-text">기타 리뷰</v-text>
                <textarea v-model="statusContent" class="review-text-field"></textarea>

                <button type="submit">리뷰 제출</button>
            </form>
        </div>

        <!-- Free Form Review Template -->
        <div v-else class="review-template domain-template">
            <form @submit.prevent="submitReview">
                <v-text class="question-text">리뷰 제목</v-text>
                <input type="text" id="domain-title" v-model="domainTitle" required />

                <v-text class="question-text">기타 리뷰</v-text>
                <textarea v-model="domainContent" id="domain-content" class="review-text-field" required></textarea>
                <button type="submit">리뷰 제출</button>
            </form>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
const reviewModule = 'reviewModule'
export default {
    data() {
        return {
            isChecked: false, // false -> Status, true -> Domain
            statusContent: '',
            domainTitle: '',
            domainContent: '',
            designScore: 0,
            usabilityScore: 0,
            qualityScore: 0,
            responsiveScore: 0,
            user: ''
        };
    },
    methods: {
        ...mapActions(reviewModule, ['requestRegisterFreeFormReviewToDjango', 'requestRegisterSelectionFormReviewToDjango']),
        submitReview() {
            if (!this.isChecked) {
                if (this.designScore == 0 || this.usabilityScore == 0 || this.qualityScore == 0 || this.responsiveScore == 0) {
                    alert('별점은 필수 입력 사항입니다!')
                } else {
                    this.user = localStorage.getItem('userToken')
                    if (!this.user) {
                        this.user = 'anonymous'
                    }
                    const payload = { 'userToken': this.user, 'ratingList': [this.designScore, this.qualityScore, this.usabilityScore, this.responsiveScore], 'content': this.statusContent }
                    this.requestRegisterSelectionFormReviewToDjango(payload)
                    console.log("Status 리뷰 제출:", payload);
                    // alert(`리뷰가 제출되었습니다!`);
                    this.clearForm();
                    this.$router.push('/review/list')
                }
            } else {
                this.user = localStorage.getItem('userToken')
                if (!this.user) {
                    this.user = 'anonymous'
                }
                const payload = { 'title': this.domainTitle, 'userToken': this.user, 'content': this.domainContent }
                this.requestRegisterFreeFormReviewToDjango(payload)
                console.log("Domain 리뷰 제출:", this.domainTitle, this.domainContent);
                // alert('리뷰가 제출되었습니다!');
                this.clearForm();
                this.$router.push('/review/list')
            }
        },
        clearForm() {
            this.statusContent = '';
            this.domainTitle = '';
            this.domainContent = '';
            this.designScore = 0;
            this.responsiveScore = 0;
            this.usabilityScore = 0;
            this.qualityScore = 0;
            this.user = ''
        },
        check(type, index) {
            // type에 따라 각 점수 업데이트
            if (type === 'design') {
                this.designScore = index;
            } else if (type === 'usability') {
                this.usabilityScore = index;
            } else if (type === 'responsive') {
                this.responsiveScore = index;
            } else if (type === 'quality') {
                this.qualityScore = index;
            }
        },
    }
};
</script>

<style scoped>
.review-page {
    padding: 20px;
    background-color: #f9f9f9;
}

.question-card {
    margin-bottom: 5px;
    margin-top: 5px;
}

.inner {
    margin: 5px;

}

.question-text {
    font-size: 20px;
    font-weight: 700;
}

.star-rating {
    align-items: center;
    display: flex;
}

.star {
    align-items: center;
    font-size: 50px;
    cursor: pointer;
    /* 클릭 가능하게 하기 위해 커서 모양 변경 */
    color: gold;
    /* 기본 색상 설정 */
    margin-top: -20px;
    margin-bottom: -15px;
}

/* 호버 시 별 색상 변경 */
.star:hover {
    color: gold;
    /* 호버할 때 별 색상을 골드로 설정 */
}

/* 선택된 별까지 색상 변경 */
.star-rating .star:hover~.star {
    color: lightgray;
    /* 호버한 별 이후의 별 색상 변경 */
}

.review-text-field {
    margin-bottom: 5px;
    box-sizing: inherit;
}

.title {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.switch {
    display: flex;
    align-items: center;
    background: #dadada;
    border-radius: 32px;
    height: var(--switch-height, 20px);
    position: absolute;
    width: var(--switch-width, 60px);
    padding: 0 10px;
    transform: translateX(100%);
    /* 오른쪽으로 이동 */
    right: 150px;
}


/* 스위치 글자 관련 설정 */
.switch label {
    color: #000;
    /* 라벨의 텍스트 색상을 흰색으로 설정 */
    font-size: 12px;
    /* 라벨의 폰트 크기를 12px로 설정 */
    font-weight: 400;
    /* 라벨의 폰트 두께를 500으로 설정 */
    line-height: var(--switch-height, 20px);
    /* 글의 세로 정렬을 위해 line-height를 스위치 높이에 맞춤 */
    text-transform: uppercase;
    /* 라벨 텍스트를 대문자로 변환 */
    transition: color 0.2s ease;
    /* 라벨의 색상 변화에 0.2초의 전환 효과 적용 */
    width: 45px;
    /* 라벨의 너비 설정 */
}

.switch label:nth-of-type(1) {
    position: absolute;
    /* 라벨의 위치를 절대 위치로 설정 */
    left: -125%;
    /* 첫 번째 라벨을 스위치 왼쪽에 위치시키기 위해 왼쪽으로 85% 이동 */
    text-align: right;
    /* 첫 번째 라벨의 텍스트를 오른쪽 정렬 */
}

.switch label:nth-of-type(2) {
    position: absolute;
    /* 라벨의 위치를 절대 위치로 설정 */
    right: -125%;
    /* 두 번째 라벨을 스위치 오른쪽에 위치시키기 위해 오른쪽으로 70% 이동 */
    text-align: left;
    /* 두 번째 라벨의 텍스트를 왼쪽 정렬 */
}

.switch input {
    height: var(--switch-height, 20px);
    /* 스위치 입력의 높이 설정 */
    left: 0;
    /* 입력 요소를 왼쪽에 위치 */
    opacity: 0;
    /* 입력 요소를 보이지 않도록 투명도 0으로 설정 */
    position: absolute;
    /* 입력 요소의 위치를 절대 위치로 설정 */
    top: 0;
    /* 입력 요소를 상단에 위치 */
    width: var(--switch-width, 100px);
    /* 스위치 입력의 너비를 100px로 설정 */
    z-index: 2;
    /* 입력 요소를 다른 요소보다 앞에 표시 (레이어 순서 설정) */
}

.switch input:checked~label:nth-of-type(1) {
    color: #000;
    /* 첫 번째 라벨의 텍스트 색상을 흰색으로 설정 (스위치가 선택되었을 때) */
}

.switch input:checked~label:nth-of-type(2) {
    color: #a0a0a0;
    /* 두 번째 라벨의 텍스트 색상을 회색으로 설정 (스위치가 선택되었을 때) */
}

.switch input~ :checked~label:nth-of-type(1) {
    color: #a0a0a0;
    /* 첫 번째 라벨의 텍스트 색상을 회색으로 설정 (스위치가 선택되지 않았을 때) */
}

.switch input~ :checked~label:nth-of-type(2) {
    color: #000;
    /* 두 번째 라벨의 텍스트 색상을 흰색으로 설정 (스위치가 선택되지 않았을 때) */
}

.switch input:checked~.toggle {
    left: 10px;
    /* 스위치가 선택되었을 때 토글이 왼쪽에 위치 */
}

.switch input~ :checked~.toggle {
    left: 40px;
    /* 스위치가 선택되지 않았을 때 토글이 오른쪽에 위치 */
}

.switch input:checked {
    z-index: 0;
    /* 입력 요소의 z-index를 0으로 설정하여 다른 요소보다 뒤로 감 */
}

.toggle {
    background: #4a4a4a;
    /* 토글의 배경색을 어두운 회색으로 설정 */
    border-radius: 50%;
    /* 토글의 모양을 원형으로 설정 (50% 반경) */
    height: calc(var(--switch-height, 20px) - 8px);
    /* 토글의 높이를 스위치 높이보다 약간 작게 설정 */
    left: 0;
    /* 토글을 왼쪽에 위치 */
    position: absolute;
    /* 토글의 위치를 절대 위치로 설정 */
    top: 4px;
    /* 토글을 위에서 4px 내려서 위치 */
    transition: left 0.2s ease;
    /* 토글이 이동할 때 0.2초의 전환 효과 적용 */
    width: calc(var(--switch-height, 20px) - 8px);
    /* 토글의 너비를 스위치 높이와 비슷하게 설정 */
    z-index: 1;
    /* 토글을 다른 요소보다 앞에 표시 */
}

.toggle.checked {
    left: calc(var(--switch-width, 100px) - calc(var(--switch-height, 20px) - 8px));
    /* 스위치가 선택되었을 때 토글이 오른쪽에 위치 */
}

.review-template {
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.status-template h3,
.domain-template h3 {
    margin-bottom: 10px;
}

form label {
    display: block;
    margin-bottom: 5px;
}

form input[type="text"],
form textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ddd;
    border-radius: 5px;
}

button {
    padding: 10px 15px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}
</style>