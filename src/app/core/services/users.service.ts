import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserForRegister } from '../models/user-for-register';
import { catchError, map, Observable, throwError, BehaviorSubject } from 'rxjs';
import { HelperService, User } from '..';
import { UserForAuthentication } from '../models/user-for-authentication';
import { AuthResponse } from '../models/auth-response';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable()
export class UsersService {

  baseUrl=environment.baseUrl;

  private currentUserSource= new BehaviorSubject<AuthResponse>(null);
  currentUser$=this.currentUserSource.asObservable();
  public jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient, private helperService:HelperService, private router: Router) { }

  login(userForAuthentication:UserForAuthentication):Observable<AuthResponse>{
    var formData=this.helperService.formDataCreator(userForAuthentication);
    return this.http.post<AuthResponse>(this.baseUrl + 'login', formData)
      .pipe(
        map(data=>{
          localStorage.setItem("token", data.authorisation.token);
          this.currentUserSource.next(data);
          return data;
        }),
        catchError(error=>{

         return throwError(error);
          
        })
      )

  }

  register(userForRegister:UserForRegister):Observable<User>{
    var formData=this.helperService.formDataCreator(userForRegister);
    return this.http.post<any>(this.baseUrl + 'register', formData)
      .pipe(
        map(data=>{
          var errorMessage='';
          if(data.status&& data.status==="failed"){
            if(data.message&&data.message.name)
              errorMessage+="\n يرجى التحقق من اسم المستخدم"
            if(data.message&&data.message.email)
              errorMessage+="\n يرجى التحقق من البريد الالكتروني "

            throw new Error(errorMessage);

          }
          return data.user;
        }),
        catchError(error=>{
          return throwError(error);
          
        })
      )

  }

  

  public isAuthenticated():boolean{
    //check the token
    let token=localStorage.getItem('token');
    
    if(token &&!this.jwtHelper.isTokenExpired(token))
    {
        return true;
    }
    return false;
  }

  

  logout(){
    localStorage.removeItem("token");
    this.router.navigateByUrl("/login");
  }

  
  
}
