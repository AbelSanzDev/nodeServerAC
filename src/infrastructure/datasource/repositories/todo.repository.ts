import { CreateTodoDto, TodoDatasource, TodoEntity, TodoRepository } from "../../../domain";
import { UpdateTodoDto } from "../../../domain/dtos/todos/update-todo.dto";




export class TodoRepositoryImpl implements TodoRepository{

    constructor(private readonly datasource:TodoDatasource){}
    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(createTodoDto);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll()
    }
    findeById(id: number): Promise<TodoEntity> {
        return this.datasource.findeById(id)
    }
    updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.updateById(updateTodoDto);
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById(id);
    }

}