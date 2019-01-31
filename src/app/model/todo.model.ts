export class Todo {

    constructor(public id:number,
        public title:string,
        public category:string,
        public description:string,
        public dueDate:number,
        public status:string){}

    public static createInstance(todo:Todo) :Todo{
        return new Todo(todo.id,todo.title,todo.category,todo.description,todo.dueDate,todo.status);
    }
}

export class TodoPage {
    constructor(public number: number,
        public totalPages: number,
        public totalElements: number,
        public size: number,
        public first: boolean,
        public last: boolean,
        public content: Todo[]){}
}