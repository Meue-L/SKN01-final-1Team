<template>
    <v-app>
      <v-container fluid class="fill-height d-flex flex-column justify-center align-center">
        <v-row>
          <v-col cols="12" class="text-center">
            <!-- 이미지 삽입: 글씨 바로 위쪽에 배치 -->
            <v-img
              :src="imageSrc"
              max-width="300"
              class="mx-auto mb-3"
            ></v-img>
          </v-col>
  
          <v-col cols="12" class="text-center">
            <!-- 중앙 메시지 -->
            <transition name="fade" mode="out-in">
              <h1 class="thank-you-text">
                설문에 참여해주셔서 감사합니다
              </h1>
            </transition>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        imageSrc: require('@/assets/images/fixed/NOODLE_logo.png'), // 이미지 경로 설정
      };
    },
  };
  </script>
  
  <style scoped>
  .fill-height {
    height: 100vh;
    background-color: #000000; /* 배경을 검은색으로 변경 */
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 1s ease;
  }
  
  .fade-enter, 
  .fade-leave-to {
    opacity: 0;
  }
  
  .thank-you-text {
    font-size: 2rem;
    color: #FFD700; /* 글씨 색을 노란색으로 변경 */
    font-family: 'Roboto', sans-serif; /* Google Fonts에서 가져온 Roboto 폰트 */
    animation: fadeIn 2s ease-in-out;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>
  