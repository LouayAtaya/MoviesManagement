export class UserForAuthentication {
    constructor(init?: Partial<UserForAuthentication>){
        this.email=init.email;          
        this.password=init.password
    }

    email: string;
    password: string;

}


