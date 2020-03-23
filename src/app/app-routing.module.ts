import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CategoryComponent } from './category/category.component';
import { AlbumComponent } from './album/album.component';
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
    path: 'album',
    component: AlbumComponent,
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
