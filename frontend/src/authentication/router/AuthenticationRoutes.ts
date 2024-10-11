import GithubRedirection from "@/authentication/redirection/GithubRedirection.vue";

const AuthenticationRoutes = [
    {
        path: '/github-oauth/github-access-token',
        name: 'GithubRedirection',
        component: GithubRedirection
    },
]

export default AuthenticationRoutes