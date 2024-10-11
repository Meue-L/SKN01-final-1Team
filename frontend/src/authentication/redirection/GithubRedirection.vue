<template>
    <div style="background-color: #1c1c1c" class="full-sized-container">
        <v-card class="margin-container"></v-card>
        <img :src="require('@/assets/images/fixed/NOODLE_logo.png')" class="NOODLE_logo">
        <v-card class="margin-container"></v-card>
        <img :src="require('@/assets/images/fixed/github_logo.png')" class="github_logo"> 
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

const authenticationModule = 'authenticationModule'

export default {
    methods: {
        ...mapActions(authenticationModule,
            ['requestAccessTokenToDjangoRedirection', 'requestUserInfoToDjango']
        ),
        async setRedirectData() {
            const code = this.$route.query.code
            console.log('code:', code)
            const res = await this.requestAccessTokenToDjangoRedirection({ code })
            console.log('res:', res)
            await localStorage.setItem('userToken', res.userToken)
            this.$router.push('/')
        }
    },
    async created() {
        const userToken = localStorage.getItem('userToken')
        if (userToken) {
            this.$router.push('/')
        } else {
            await this.setRedirectData()
        }
    }
}

</script>

<style scoped>
.full-sized-container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
}

.margin-container{
    width: 75px;
}

.NOODLE_logo,
.github_logo {
    margin: 0 50px;
}

.NOODLE_logo {
    width: 225px;
    height: 225px;
}

.github_logo {
    width: 300px;
    height: 300px;
}
</style>