import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";




export class AppRoutes{
    //*static hace que la funcion se pueda utilizar sin instaciar la clase y el get lo convierte en un getter lo cual hace que el metodo se
    //*se comporte como una propiedad y se pueda llamar sin la necesidad de utiliza parentesis ()
    static get routes():Router{
        const router = Router();
        
        //*Se estan definiedo las rutas de todos con el middleware
        router.use('/api/todos',TodoRoutes.routes);
        return router;
    }
}