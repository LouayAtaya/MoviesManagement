import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoviesRoutingModule } from './movies-routing.module';
import { MoviesComponent } from './pages/movies.component';
import { MovieCreateComponent } from './pages/movie-create/movie-create.component';
import { MovieDetailsComponent } from './pages/movie-details/movie-details.component';
import { MovieUpdateComponent } from './pages/movie-update/movie-update.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MoviesComponent,
    MovieCreateComponent,
    MovieDetailsComponent,
    MovieUpdateComponent
  ],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    SharedModule
  ]
})
export class MoviesModule { }
