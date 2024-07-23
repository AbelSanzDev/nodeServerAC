import { UpdateTodoDto } from "../../dtos/todos/update-todo.dto";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.reposotory";


export interface DeleteTodoUseCase{
    excute(id:number):Promise<TodoEntity>
}

export class DeleteTodo implements DeleteTodoUseCase{
    constructor(private readonly repository:TodoRepository){}
    excute(id: number): Promise<TodoEntity> {
        return this.repository.deleteById(id);
    }
}