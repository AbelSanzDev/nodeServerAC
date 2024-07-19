import { Request, Response } from "express"


let todos = [
    {id:1, text:"buy milk", createdAt:new Date()},
    {id:2, text:"buy milk", createdAt:new Date()},
    {id:3, text:"buy milk", createdAt:new Date()},
  
];

export class TodosController{
    //*DI
    constructor(){}


    public getTodos = (req:Request,res:Response)=>{
        return res.json(todos);
    }
    public getTodoById = (req:Request, res:Response)=>{
        const id = +req.params.id;
        if(isNaN(id)){
            return res.status(400).json({message:"Is not a number"})
        }
        const todo = todos.find(todo => todo.id === id);
        if(!todo){
            return res.status(404).json({message:"Todo no encontrado"})
        }
        res.json(todo)
    }
    public createTodo = (req:Request,res:Response)=>{
        const {text} = req.body;
        if(!text) return res.status(400).json({message:"You must have the text"});
        const newTodo = {
            id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
            text:text,
            createdAt: new Date(),

        }
        todos.push(newTodo)
        res.json(todos)
    }

    public updateTodo = (req:Request,res:Response)=>{
        const id = +req.params.id;
        if(isNaN(id)) return res.status(400).json({message:"id must to be a number"});
        const {text} = req.body;
        if(!text) return res.status(400).json({message:"text is empty"});
        const todo = todos.find(todo => todo.id === id)
        if(!todo) return res.status(400).json({message:"Todo not found"});
        todo.text = text;
        res.json(todos);
    }

    public deleteTodo = (req:Request,res:Response)=>{
        const id = +req.params.id;
        if(!id) return res.status(400).json({message:"You must provide the id"});
        const newData = todos.filter(todo => todo.id !== id );
        todos = newData
        res.json(todos)
    }

}