import { prisma } from "../../data/postgresData";
import { CreateTodoDto, TodoDatasource, TodoEntity } from "../../domain";
import { UpdateTodoDto } from "../../domain/dtos/todos/update-todo.dto";




export class TodoDatasourceImpl implements TodoDatasource{
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        const todo = await prisma.todo.create({
            data:createTodoDto! //*El signo de admiracion se utiliza cuando sabemos con certeza que no es null o undefined
        });

        return TodoEntity.fromJson(todo);
    }
    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        return todos.map(todo => TodoEntity.fromJson(todo));
    }
   async findeById(id: number): Promise<TodoEntity> {
    const todo = await prisma.todo.findUnique({
        where:{
            id:id
        }
    })
    if(!todo) throw "Todo not found"
    return TodoEntity.fromJson(todo);
    }
    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        await this.findeById(updateTodoDto.id);
        const todoUpdate = await prisma.todo.update({
            where:{
                id:updateTodoDto.id
            },
            data:{
                text:updateTodoDto.text
            }
        })
        return TodoEntity.fromJson(todoUpdate);
    }
    async deleteById(id: number): Promise<TodoEntity> {
        await this.findeById(id);

        const todoDeleted = await prisma.todo.delete({
            where:{
                id:id
            }
        })

        return TodoEntity.fromJson(todoDeleted);
        
    }

}