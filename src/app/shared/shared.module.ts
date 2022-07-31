import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './layout/footer/footer.component';
import { MainHeaderComponent } from './layout/main-header/main-header.component';
import { MainSidebarComponent } from './layout/main-sidebar/main-sidebar.component';
import { ContentHeaderComponent } from './layout/content-header/content-header.component';
import { NotFoundComponent } from './layout/not-found/not-found.component';
import { UnAuthorizedComponent } from './layout/un-authorized/un-authorized.component';
import { PreLoaderComponent } from './layout/pre-loader/pre-loader.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {PaginatorModule} from 'primeng/paginator';
import {ToastModule} from 'primeng/toast';
import { ToastrModule } from 'ngx-toastr';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { LoadingIndicatorComponent } from './layout/loading-indicator/loading-indicator.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {DropdownModule} from 'primeng/dropdown';



@NgModule({
  declarations: [
    FooterComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    ContentHeaderComponent,
    NotFoundComponent,
    UnAuthorizedComponent,
    PreLoaderComponent,
    LoginComponent,
    RegisterComponent,
    LoadingIndicatorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    PaginatorModule,
    ButtonModule,TableModule,ToastModule,
    ToastrModule.forRoot({
      positionClass:'toast-top-center',
      preventDuplicates:false,
      closeButton:true
    }),
    ProgressSpinnerModule,
    ConfirmDialogModule,DropdownModule
  ],
  
  exports:[
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    FooterComponent,
    MainHeaderComponent,
    MainSidebarComponent,
    ContentHeaderComponent,
    NotFoundComponent,
    UnAuthorizedComponent,
    PreLoaderComponent,
    LoginComponent,
    PaginatorModule,
    ButtonModule,TableModule,ToastModule,ProgressSpinnerModule,
    ToastrModule,
    LoadingIndicatorComponent,
    ConfirmDialogModule,DropdownModule
  ]
})
export class SharedModule { }
