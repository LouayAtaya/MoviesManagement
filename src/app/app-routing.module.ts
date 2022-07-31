import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent, RegisterComponent, NotFoundComponent, UnAuthorizedComponent } from './shared';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {path: '',  loadChildren: () => import('./main').then(m => m.MainModule), canActivate: [AuthGuard]},
  
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"404",component:NotFoundComponent},
  {path:"401",component:UnAuthorizedComponent},
  {path:"**",redirectTo:'404', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
