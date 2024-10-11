import SurveyRegisterPage from "@/survey/pages/register/SurveyRegisterPage.vue";
import SurveyReadPage from "@/survey/pages/read/SurveyReadPage.vue";
import SurveyListPage from "@/survey/pages/list/SurveyListPage.vue"
import ThankYouPage from "@/survey/pages/thankyou/ThankYouPage.vue"

const SurveyRoutes = [
    {
        path: "/survey/register",
        name: "SurveyRegisterPage",
        component: SurveyRegisterPage
    },
    {
        path: '/survey/read/:surveyId',
        name: 'SurveyReadPage',
        components: {
            default: SurveyReadPage,
        },
        props: {
            default: true
        }
    },
    {
        path: '/survey/list',
        name: 'SurveyListPage',
        component: SurveyListPage,
    },
    {
        path: '/survey/thankyou',
        name: 'ThankYouPage',
        component: ThankYouPage,
    },
]

export default SurveyRoutes