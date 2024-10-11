import ResultReportRegisterPage from "@/resultReport/pages/register/ResultReportRegisterPage.vue"
import ResultReportListPage from "@/resultReport/pages/list/ResultReportListPage.vue"

const ResultReportRoutes = [
    {
        path: "/result-report/register",
        name: "ResultReportRegisterPage",
        component: ResultReportRegisterPage,
    },

    {
        path: "/result-report/list",
        name: "ResultReportListPage",
        component: ResultReportListPage
    }
]

export default ResultReportRoutes