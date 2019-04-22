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
import { MatFormFieldModule,MatInputModule,MatCardModule,MatButtonModule,MatSlideToggleModule,MatIconModule,
  MatTableModule,MatMenuModule,MatSelectModule,MatListModule,MatPaginatorModule,MatSortModule,MatToolbarModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { SingleFileUploadComponent } from './single-file-upload/single-file-upload.component';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    SubcategoryComponent,
    MeidaComponent,
    LoginComponent,
    MenuComponent,
    FileUploadComponent,
    FileSelectDirective,
    SingleFileUploadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,MatInputModule,MatCardModule,MatButtonModule,MatSlideToggleModule,MatIconModule,MatTableModule,MatMenuModule,
    MatSelectModule,FormsModule,MatFileUploadModule,MatListModule,MatPaginatorModule,MatSortModule,MatToolbarModule,

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
