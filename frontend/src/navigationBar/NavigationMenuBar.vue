<template>
    <v-app-bar class="nevigationbar">
        <v-btn @click="goToHome" alt="GO TO HOME">
            <v-toolbar-title class="goToHomeButton">
            <span>NOODLE</span>
            </v-toolbar-title>
        </v-btn>

    <v-toolbar-title class="temporarily" >
        Backlog Board
    </v-toolbar-title>

    <!-- 메뉴 이동 버튼 -->
        <!-- <v-container class="manuBtn">
            <v-btn @click="goToBacklogBoard" class="btn-text" alt="GO TO BACKLOGBOARD">
                <v-icon left>mdi-pencil</v-icon>
                <span>Backlog Board</span>
            </v-btn>
            <v-btn @click="goToIssueBoard" class="btn-text" alt="GO TO ISSUEBOARD">
                <v-icon left>mdi-alert-circle</v-icon>
                <span>Issue Board</span>
            </v-btn>
        </v-container> -->
    </v-app-bar>
</template>

<script>
import '@mdi/font/css/materialdesignicons.css'
import router from '@/router'
import { mapActions, mapState } from 'vuex'


export default {
    data () {
        return {

        }
    },
    computed: {

    },
    methods: {
        goToHome () {
            router.push('/')
        },
        goToBacklogBoard () {
            router.push('/projectManage')
        },
        goToIssueBoard () {
            router.push('')
        },
    },
    mounted () {
    console.log('navigation bar mounted()')

    }

}
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Black+Han+Sans&family=Nanum+Gothic+Coding:wght@400;700&family=Nanum+Myeongjo:wght@400;700;800&family=Orbit&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap');

.nevigationbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #1c1c1c;
    border-bottom: 3px solid rgba(204, 159, 1);
    height: 70px;
}

.goToHomeButton{
  color: rgba(204, 159, 1);
  font-family: "Playfair Display", serif;
  font-style: normal;
  font-weight: bold;
  font-size: 30px;
}

.btn-text{
  color: rgba(204, 159, 1);
  font-family: "Playfair Display", serif;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
}

.manuBtn{
    display: flex;
    justify-content: flex-end;
    padding-right:  20px;
}

.temporarily{
  display: flex;
  justify-content: flex-end;
  color: rgba(204, 159, 1);
  font-family: "Playfair Display", serif;
  font-style: normal;
  font-weight: bold;
  font-size: 20px;
  padding-right:  70px;
}

</style>