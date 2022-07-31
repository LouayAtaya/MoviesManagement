import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HelperService, Movie ,MovieForCreation} from '..';
import { MovieForUpdate } from '../models/movie-for-update';

@Injectable()
export class MoviesService {

  baseUrl=environment.baseUrl;
  constructor(private http: HttpClient, private helperService:HelperService,) { }

  getMovies():Observable<Movie[]>{
    return this.http.get<any>(this.baseUrl+"movies")
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

  getMovieDetails(id:number):Observable<Movie>{
    return this.http.get<any>(this.baseUrl+"movies/"+id)
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

  getMoviesByCategory(categoryId:number):Observable<Movie[]>{
    return this.http.get<any>(this.baseUrl+"moviesByCategory/"+categoryId)
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

  addMovie(movieForCreation:MovieForCreation): Observable<Movie> {

    var formData=this.helperService.formDataCreator(movieForCreation);
    return this.http.post<any>(this.baseUrl+"movies",formData)
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

  UpdateMovie(id:number, movieForUpdate:MovieForUpdate): Observable<any> {
    var formData=this.helperService.formDataCreator(movieForUpdate);
    return this.http.post<any>(this.baseUrl+"movies/"+id,formData)
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

  DeleteMovie(id:number): Observable<any> {
    var input={_method:"delete"}
    var formData=this.helperService.formDataCreator(input);

    return this.http.post<any>(this.baseUrl+"movies/"+id,formData)
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
