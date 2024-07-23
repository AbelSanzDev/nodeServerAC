



export class TodoEntity{
    constructor(
        public id: number,
        public text: string,
        public completedAt?: Date|null
    ){}

    get isCompleted(){
        return !!this.completedAt
    }

    static fromJson(object:{[key:string]:any}){
        const {id,text,completedAt}= object;
        if(!id) throw 'Id required';

        let newCompletedaAt;
        if(completedAt){
            newCompletedaAt = new Date(completedAt);
            if(isNaN(completedAt.getTime())){
                throw "Fecha incorrecta"
            }
        }

       return new TodoEntity(
            id,text,completedAt
        )
    }
}