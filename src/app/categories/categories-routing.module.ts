import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriesComponent } from './pages/categories.component';
import { CategoryCreateComponent } from './pages/category-create/category-create.component';
import { CategoryDetailComponent } from './pages/category-detail/category-detail.component';
import { CategoryUpdateComponent } from './pages/category-update/category-update.component';

const routes: Routes = [
  {path:'', component:CategoriesComponent},
  {path:'add', component:CategoryCreateComponent},
  {path:':id', component:CategoryDetailComponent},
  {path:'update/:id', component:CategoryUpdateComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }
