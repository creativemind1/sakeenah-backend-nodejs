import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { MeidaComponent } from './meida/meida.component';
import { LoginComponent } from './login/login.component';
import { MatFormFieldModule,MatInputModule,MatCardModule,MatButtonModule,MatSlideToggleModule,MatIconModule,MatTableModule,MatMenuModule,MatSelectModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { JwtModule } from '@auth0/angular-jwt';



@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    SubcategoryComponent,
    MeidaComponent,
    LoginComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,MatInputModule,MatCardModule,MatButtonModule,MatSlideToggleModule,MatIconModule,MatTableModule,MatMenuModule,
    MatSelectModule,FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('access_token');},
        whitelistedDomains: ['localhost:4200/subcategory','localhost:4200/category','localhost:4200/media'],
        blacklistedRoutes: ['http://localhost:4200/login']
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
