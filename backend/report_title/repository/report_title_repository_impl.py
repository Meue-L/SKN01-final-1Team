from report_title.entity.report_title import ResultReportTitle
from report_title.repository.report_title_repository import ResultReportTitleRepository


class ResultReportTitleRepositoryImpl(ResultReportTitleRepository):
    __instance = None

    def __new__(cls):
        if cls.__instance is None:
            cls.__instance = super().__new__(cls)

        return cls.__instance

    @classmethod
    def getInstance(cls):
        if cls.__instance is None:
            cls.__instance = cls()

        return cls.__instance

    def create(self, resultReportId, title):
        ResultReportTitle.objects.create(report_id=resultReportId, title=title)
    