import { Request, Response } from "express"
import { prisma } from "../../data/postgresData";
import { CreateTodoDto } from "../../domain/dtos";


export class TodosController{

    //*DI
    constructor(){}


    public getTodos = async(req:Request,res:Response)=>{
        const todos = await prisma.todo.findMany();
        
        return res.json(todos);
    }
    public getTodoById = async(req:Request, res:Response)=>{
        const id = +req.params.id;
        if(isNaN(id)){
            return res.status(400).json({message:"Is not a number"})
        }

        const todo = await prisma.todo.findUnique({
            where:{
                id:id
            }
        })
        res.json(todo)
       
    }
    public createTodo = async(req:Request,res:Response)=>{
        const [error,createTodoDto] = CreateTodoDto.create(req.body);
        if(error) return res.status(400).json({message:"You must have the text"});
        console.log(createTodoDto)
        const todo = await prisma.todo.create({
            data:createTodoDto! //*El signo de admiracion se utiliza cuando sabemos con certeza que no es null o undefined
        });

        
        res.json(todo)
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

    public deleteTodo = async(req:Request,res:Response)=>{
        const id = +req.params.id;
        if(!id) return res.status(400).json({message:"You must provide the id"});
        const todoDeleted = await prisma.todo.delete({
            where:{
                id:id
            }
        })
        res.json(todoDeleted);
    }

}