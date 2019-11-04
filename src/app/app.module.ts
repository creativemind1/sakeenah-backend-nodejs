import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CategoryComponent } from './category/category.component';
import { SubcategoryComponent } from './subcategory/subcategory.component';
import { MediaComponent } from './media/media.component';
import { LoginComponent } from './login/login.component';
import { MatDialogModule, MatFormFieldModule,MatInputModule,MatCardModule,MatButtonModule,MatSlideToggleModule,MatIconModule,
  MatTableModule,MatMenuModule,MatSelectModule,MatListModule,MatPaginatorModule,MatSortModule,MatToolbarModule} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { JwtModule } from '@auth0/angular-jwt';
import { MatFileUploadModule } from 'angular-material-fileupload';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { FileUploadModule } from 'ng2-file-upload';

import { SingleFileUploadComponent } from './single-file-upload/single-file-upload.component';
import { ResetPswdComponent } from './reset-pswd/reset-pswd.component';
import { PlayListComponent } from './play-list/play-list.component';
import { MyDialogComponent } from './my-dialog/my-dialog.component';
import { MyDialogComponentComponent } from './my-dialog-component/my-dialog-component.component'

@NgModule({
  entryComponents: [MyDialogComponent],
  declarations: [
    AppComponent,
    CategoryComponent,
    SubcategoryComponent,
    MediaComponent,
    LoginComponent,
    MenuComponent,
    FileUploadComponent,
    
    SingleFileUploadComponent,
    ResetPswdComponent,
    PlayListComponent,
    MyDialogComponent,
    MyDialogComponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FileUploadModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatFormFieldModule,MatInputModule,MatCardModule,MatButtonModule,MatSlideToggleModule,MatIconModule,MatTableModule,MatMenuModule,
    MatSelectModule,FormsModule,MatFileUploadModule,MatListModule,MatPaginatorModule,MatSortModule,MatToolbarModule,
    MatDialogModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: jwtTokenGetter,
        whitelistedDomains: ['/subcategory', 'l/category', '/media'],
        blacklistedRoutes: ['/login']
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
export function jwtTokenGetter() {
  return localStorage.getItem('access_token');
}
