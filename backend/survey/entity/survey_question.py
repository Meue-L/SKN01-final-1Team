from django.db import models

from survey.entity.survey import Survey


class SurveyQuestion(models.Model):
    id = models.AutoField(primary_key=True)
    SurveyID = models.ForeignKey(Survey, on_delete=models.CASCADE)
    SurveyQuestionNumber = models.IntegerField(default=0)
    SurveyQuestionSentence = models.CharField(max_length=500, default=None)

    class Meta:
        db_table = "survey_question"
        app_label = "survey"
