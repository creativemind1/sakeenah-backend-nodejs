import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { MediaComponent } from './media/media.component';
import { PlayListComponent } from './play-list/play-list.component';
import { ResetPswdComponent } from './reset-pswd/reset-pswd.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';


const routes: Routes = [
  { 
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: 'reset',
    component: ResetPswdComponent,
    //canActivate: [AuthGuard]
  },
  {
    path: 'category',
    component: CategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'subcategory',
    component: SubcategoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'media',
    component: MediaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'playlist',
    component: PlayListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '', 
    redirectTo: '/login',
    pathMatch: 'full'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthService, AuthGuard],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
