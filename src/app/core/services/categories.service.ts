import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, CategoryForCreation, CategoryForUpdate } from '..';
import { HelperService } from './helper.service';

@Injectable()
export class CategoriesService {

  baseUrl=environment.baseUrl;
  constructor(private http: HttpClient, private helperService:HelperService) { }

  getCategories():Observable<Category[]>{
    return this.http.get<any>(this.baseUrl+"category")
    .pipe(
      map(data=>{
        if(data.status&& data.status==="failed"){
          
          throw new Error("يرجى المحاولة لاحقا, حصل خطأ ما");
        }
        
        return data.message;
      }),
      catchError(error=>{
        return throwError(error);
        
      })
    );
  }

  getCategoryDetails(id:number):Observable<Category>{
    return this.http.get<Category>(this.baseUrl+"category/"+id);
  }

  addCategory(categoryForCreation:CategoryForCreation): Observable<Category> {
    return null ;
  }

  UpdateCategory(id:number, categoryForUpdate:CategoryForUpdate): Observable<any> {
    return null;
  }

  DeleteCategory(id:number): Observable<any> {
    var input={_method:"delete"}
    var formData=this.helperService.formDataCreator(input);

    return this.http.post<any>(this.baseUrl+"category/"+id,formData)
    .pipe(
      map(data=>{

        if(data.status&& data.status==="failed"){
          
          throw new Error("يرجى المحاولة لاحقا, حصل خطأ ما");
        }
        
        return data.message;
      }),
      catchError(error=>{
        return throwError(error);
        
      })
    );  
  }

 
}
