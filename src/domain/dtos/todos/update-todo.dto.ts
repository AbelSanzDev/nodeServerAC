



export class UpdateTodoDto{

    private constructor(public readonly text?:string){}
 
    static create(props:{[key:string]:any}):[string?, UpdateTodoDto?]{
 
     const {text} = props;
     
 
 
     return[undefined, new UpdateTodoDto(text)];
    }
 }