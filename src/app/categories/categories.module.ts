import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoryCreateComponent } from './pages/category-create/category-create.component';
import { CategoryUpdateComponent } from './pages/category-update/category-update.component';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';
import { CategoriesComponent } from './pages';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryCreateComponent,
    CategoryUpdateComponent,
    CategoryDetailComponent
  ],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ]
})
export class CategoriesModule { }
