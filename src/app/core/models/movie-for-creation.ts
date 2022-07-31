export class MovieForCreation {
    constructor(init?: Partial<MovieForCreation>){
        this.name=init.name;          
        this.description=init.description
        this.image=init.image;          
        this.category_id=init.category_id;          

    }
    name:string;
    description:string;
    image:File;
    category_id:number;
}
