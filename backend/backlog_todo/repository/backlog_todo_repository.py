from abc import ABC, abstractmethod

class BacklogTodoRepository(ABC):
    @abstractmethod
    def create(self, backlog, todo):
        pass
    @abstractmethod
    def findByBacklog(self, backlog):
        pass