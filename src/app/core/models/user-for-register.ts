export class UserForRegister {
    constructor(init?: Partial<UserForRegister>){
        this.name=init.name;
        this.email=init.email;          
        this.password=init.password
    }
    name:string;
    email:string;
    password:string;
}
