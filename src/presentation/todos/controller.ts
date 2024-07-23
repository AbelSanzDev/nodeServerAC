import { Request, Response } from "express"
import { prisma } from "../../data/postgresData";
import { CreateTodoDto } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository } from "../../domain";



export class TodosController{

    //*DI
    constructor(private readonly todoRepositoty:TodoRepository){}


    public getTodos = (req:Request,res:Response)=>{
       
        new GetTodos(this.todoRepositoty)
        .excute()
        .then(todos => res.json(todos))
        .catch(error => res.status(400).json({message:error.message}))
    }
    public getTodoById = (req:Request, res:Response)=>{
        const id = +req.params.id;
        if(isNaN(id)){
            return res.status(400).json({message:"Is not a number"})
        }

      new GetTodo(this.todoRepositoty)
      .excute(id)
      .then(todo => res.json(todo))
      .catch(error => res.status(400).json({message:error.message}));
       
    }
    public createTodo = (req:Request,res:Response)=>{
        const [error,createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({message:"You must have the text"});
        new CreateTodo(this.todoRepositoty)
        .excute(createTodoDto!)
        .then(todo => res.json(todo))
        .catch(error => res.status(400).json({message:error.message}));
    }

    public updateTodo = async(req:Request,res:Response)=>{
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({message:"id must to be a number"});
        const {text} = req.body;
        if(!text) return res.status(400).json({message:"text is empty"});
        const todoUpdate = await prisma.todo.update({
            where:{
                id:id
            },
            data:{
                text:text
            }
        })
        res.json(todoUpdate);
    }

    public deleteTodo = (req:Request,res:Response)=>{
        const id = +req.params.id;
        if(!id) return res.status(400).json({message:"You must provide the id"});
        new DeleteTodo(this.todoRepositoty)
        .excute(id)
        .then(todo => res.json(todo))
        .catch(error=> res.status(400).json({message:error.message}));
    }
}