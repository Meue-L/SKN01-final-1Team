<template>
    <div></div>
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
        await this.setRedirectData()
    }
}

</script>