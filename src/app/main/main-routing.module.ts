import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent, HomeComponent, MainComponent, SettingsComponent } from './pages';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '', component: MainComponent,
    children: [
      {path:'', redirectTo:'home', pathMatch:'full'},
      { path: 'home', component: HomeComponent },
      { path: 'settings', component: SettingsComponent },
      { path: 'aboutus', component: AboutUsComponent },
      {path: 'movies',  loadChildren: () => import('src/app/movies').then(m => m.MoviesModule), canActivate: [AuthGuard]},
      {path: 'categories',  loadChildren: () => import('src/app/categories').then(m => m.CategoriesModule), canActivate: [AuthGuard]},

    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
