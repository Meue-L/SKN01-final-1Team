from django.db import models

from backlog.entity.backlog import Backlog


class BacklogMapNumber(models.Model):
    id = models.AutoField(primary_key=True)
    backlog = models.ForeignKey(Backlog, on_delete=models.CASCADE, related_name='map_numbers')
    mapNumber = models.IntegerField()

    def __str__(self):
        return f"Map Number {self.mapNumber} for {self.backlog.title}"

    class Meta:
        db_table = "backlog_map_number"