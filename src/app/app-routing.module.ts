import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { MeidaComponent } from './meida/meida.component';
import {AppComponent} from './app.component'


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'subcategory', component: SubcategoryComponent },
  { path: 'media', component: MeidaComponent },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
 
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
 
  exports: [RouterModule]
})
export class AppRoutingModule { }
