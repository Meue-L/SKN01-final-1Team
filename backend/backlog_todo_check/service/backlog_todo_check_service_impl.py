from backlog.repository.backlog_repository_impl import BacklogRepositoryImpl
from backlog_todo.repository.backlog_todo_repository_impl import BacklogTodoRepositoryImpl
from backlog_todo_check.repository.backlog_todo_check_repository_impl import BacklogTodoCheckRepositoryImpl
from backlog_todo_check.service.backlog_todo_check_service import BacklogTodoCheckService


class BacklogTodoCheckServiceImpl(BacklogTodoCheckService):
    __instance = None

    def __new__(cls):
        if cls.__instance is None:
            cls.__instance = super().__new__(cls)
            cls.__instance.__backlogRepository = BacklogRepositoryImpl.getInstance()
            cls.__instance.__backlogTodoCheckRepository = BacklogTodoCheckRepositoryImpl.getInstance()
            cls.__instance.__backlogTodoRepository = BacklogTodoRepositoryImpl().getInstance()

        return cls.__instance

    @classmethod
    def getInstance(cls):
        if cls.__instance is None:
            cls.__instance = cls()

        return cls.__instance

    def createBacklogTodoCheck(self, backlogId, isChecked):
        try:
            backlog = self.__backlogRepository.findById(backlogId)
            todo = self.__backlogTodoRepository.findByBacklog(backlog)

            if not backlog:
                return ValueError(f"Backlog with id {backlogId} does not exist")

            if not todo:
                return ValueError(f"Todo with backlog {backlog} does not exist")

            return self.__backlogTodoCheckRepository.create(todo, isChecked)

        except Exception as e:
            print('Error creating Checked', e)
            raise e

