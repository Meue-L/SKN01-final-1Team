from abc import ABC, abstractmethod

class BacklogStatusService(ABC):
    @abstractmethod
    def createBacklogStatus(self, backlogId, backlogStatus):
        pass