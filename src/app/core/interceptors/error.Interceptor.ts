import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(http:HttpClient, private router:Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = this.handleError(error)
        return throwError(errorMessage);
      })
    )
  }

  private handleError = (error: HttpErrorResponse) : string => {
    switch (error.status) {

      case 404:      
        return this.handleNotFound(error);
        break;
      case 400:      
        return this.handleBadRequest(error);
        break;
      case 403:      
        this.router.navigateByUrl("/401")
        break;
      case 401:      
        return this.handleUnAuthorizedError(error);
        break;
      case 500:      
        return this.handleServerError(error);
        break;
     
    }
    
  }

  private handleServerError = (error: HttpErrorResponse): string => {
    return "حصلت مشكلة بالمخدم, يرجى المحاولة لاحقا";
  }

  private handleNotFound = (error: HttpErrorResponse): string => {
    this.router.navigate(['/404']);
    return error.message;
  }

  private handleBadRequest = (error: HttpErrorResponse): string => {
     
    return error.error ? error.error : error.message;
    
  }

  private handleUnAuthorizedError = (error: HttpErrorResponse): string => {
     console.log(error)
    return "ليس لديك امكانية للوصول, تحقق من اسم المستخدم اوكلمة المرور";
    
  }

}
