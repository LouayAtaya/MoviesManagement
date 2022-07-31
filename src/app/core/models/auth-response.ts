export class AuthResponse {
    status:string;
    authorisation:Authorisation
    message:string;
}

class Authorisation{
    token:string;
    type:string;
}


