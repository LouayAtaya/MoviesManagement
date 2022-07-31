import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviesService ,ContentHeaderService,CategoriesService,UsersService} from '.';
import { LoadingService } from './services/loading.service';
import { HelperService } from './services/helper.service';
import { ErrorInterceptor } from './interceptors/error.Interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthGuard } from './guards/auth.guard';
import { AppHttpInterceptor } from './interceptors/app-http.interceptor';
import { MessageService, ConfirmationService } from 'primeng/api';



@NgModule({
  declarations: [],
  providers:[
    MoviesService,
    CategoriesService,
    ContentHeaderService,
    UsersService,
    LoadingService,
    HelperService,
    {provide:HTTP_INTERCEPTORS,useClass:AppHttpInterceptor,multi:true},
    {provide:HTTP_INTERCEPTORS,useClass:ErrorInterceptor,multi:true},
    AuthGuard,
    MessageService,
    ConfirmationService
  ],
  imports: [
    CommonModule,
    
    
  ]
})
export class CoreModule { }
