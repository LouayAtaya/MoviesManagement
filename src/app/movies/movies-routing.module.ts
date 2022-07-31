import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './pages';
import { MovieCreateComponent } from './pages/movie-create/movie-create.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieUpdateComponent } from './pages/movie-update/movie-update.component';

const routes: Routes = [
  {path:'', component:MoviesComponent},
  {path:'add', component:MovieCreateComponent},
  {path:':id', component:MovieDetailsComponent},
  {path:'update/:id', component:MovieUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoviesRoutingModule { }
