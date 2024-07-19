import { Router } from "express";
import { TodosController } from "./controller";




export class TodoRoutes{
    //*static hace que la funcion se pueda utilizar sin instaciar la clase y el get lo convierte en un getter lo cual hace que el metodo se
    //*se comporte como una propiedad y se pueda llamar sin la necesidad de utiliza parentesis ()
    static get routes():Router{
        const router = Router();
        const todoController = new TodosController();
        
        router.get('/',(req,res)=>todoController.getTodos(req,res));
        router.post('/',(req,res)=>todoController.createTodo(req,res));
        router.put('/:id',(req,res)=>todoController.updateTodo(req,res));
        router.delete('/:id',(req,res)=>todoController.deleteTodo(req,res));
        router.get('/:id',(req,res)=>todoController.getTodoById(req,res));
        
        return router;
    }
}