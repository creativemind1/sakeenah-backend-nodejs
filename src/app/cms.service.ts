import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { Category } from './category/category';
import { SubCategory } from './subcategory/subcategory';
import { Login } from './login/login';
import { Media } from './media/media';
import { JwtService } from './jwt.service';
import { FileUpload } from './file-upload/fileUpload'
import { PlayList } from './play-list/playlist';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class CmsService {
  private subject = new Subject<any>();
  companyId = environment.companyId;
  baseUrl = environment.baseUrl;
  loginUrl = environment.loginUrl;
  uploadUrl = environment.uploadUrl;
  singleUploadUrl = environment.singleUploadUrl;
  serverBaseUrl = environment.serverBaseUrl;
  thumbImageUrl: FileUpload;
  updateIBOsNavigationSubject = new BehaviorSubject<any>('');
  constructor(private http: HttpClient, private jwtService: JwtService, private auth: AuthService) {
  }

  // Load all the categories based on the company Id
  getCategories() {
    var token = this.auth.getToken();
    return this.http.post(this.baseUrl + '/category', {
      "type": "LOAD",
      "companyId": this.companyId, 'token': token
    }).pipe(map((resp) => {
      return resp;
    }));
  };

  //Save or Update Category
  saveOrupdateCategory(category: Category) {
    var token = this.auth.getToken();
    category['token'] = token;
    category.companyId = this.companyId;
    return this.http.post(this.baseUrl + '/category', category).pipe(map((resp) => {
      return resp;
    }));
  };
  //Delete Category
  deleteCategory(category: Category) {
    var token = this.auth.getToken();
    category['token'] = token;
    return this.http.post(this.baseUrl + '/category', category).pipe(map((resp) => {
      return resp;
    }));
  };

  // Load all the Sub categories based on the company Id
  getAllSubCategories() {
    var token = this.auth.getToken();
    return this.http.post(this.baseUrl + '/subcategory', {
      "type": "LOAD",
      "companyId": this.companyId, 'token': token
    }).pipe(map((resp) => {
      return resp;
    }));
  };

  //Save or Update Sub Category
  saveOrupdateSubCategory(subCategory: SubCategory) {
    subCategory.companyId = this.companyId;
    var token = this.auth.getToken();
    subCategory['token'] = token;
    return this.http.post(this.baseUrl + '/subcategory', subCategory).pipe(map((resp) => {
      return resp;
    }));
  };

  //Delete Sub Category
  deleteSubCategory(subCategory: SubCategory) {
    var token = this.auth.getToken();
    subCategory['token'] = token;
    return this.http.post(this.baseUrl + '/subcategory', subCategory).pipe(map((resp) => {
      return resp;
    }));
  };

  // Load all the Media based on the company Id
  getAllMedia() {
    var token = this.auth.getToken();
    return this.http.post(this.baseUrl + '/media', {
      "type": "LOAD",
      "companyId": this.companyId, 'token': token
    }).pipe(map((resp) => {
      return resp;
    }));
  };

  //Save or Update Sub Category
  saveOrupdateMedia(media: Media) {
    media.companyId = this.companyId;
    var token = this.auth.getToken();
    media['token'] = token;
    return this.http.post(this.baseUrl + '/media', media).pipe(map((resp) => {
      return resp;
    }));
  };

  //Delete Sub Category
  deleteMedia(media: Media) {
    var token = this.auth.getToken();
    media['token'] = token;
    return this.http.post(this.baseUrl + '/media', media).pipe(map((resp) => {
      return resp;
    }));
  };

  //Single file
  singleFileupload(formData: FormData) {
    return this.http.post(this.singleUploadUrl, formData).pipe(map((resp) => {
      return resp;
    }));
  };
 
    //Delete Sub Category
  upload(formData: FormData) {
    return this.http.post(this.uploadUrl, formData).pipe(map((resp) => {
      return resp;
    }));
  };

  // Load all the Sub categories based on the company Id
  getSubCategories(media: Media) {
    var token = this.auth.getToken();
    return this.http.post(this.baseUrl + '/subcategory', {
      "type": "GET_SUB_CATEGORY",
      "companyId": this.companyId, 'categoryId': media.categoryId, 'token': token
    }).pipe(map((resp) => {
      return resp;
    }));
  };

  //Delete file
  deleteSingleFile(fileurl: String) {
    return this.http.post(this.serverBaseUrl + 'deleteFile', { "filePath": fileurl }).pipe(map((resp) => {
      return resp;
    }));
  };

  sendMessage(transportMsg: { img: FileUpload, video: FileUpload[] }) {
    this.updateIBOsNavigationSubject.next(transportMsg);
  }

  clearMessages() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.updateIBOsNavigationSubject.asObservable();
  }

  // Reset CMS Pswd
  resetPswd(login: Login) {
    return this.http.post(this.loginUrl + '/resetpswd', login).pipe(map((resp) => {
      return resp;
    }));
  }

  // Load all the PlayList based on the company Id
  getAllPlayLists() {
    var token = this.auth.getToken();
    return this.http.post(this.baseUrl + '/playlist', {
      "type": "LOAD",
      "companyId": this.companyId, 'token': token
    }).pipe(map((resp) => {
      return resp;
    }));
  }

  //Save or Update Sub Category
  saveOrupdatePlayList(playList: PlayList) {
    playList.companyId = this.companyId;
    var token = this.auth.getToken()
    playList['token'] = token;
    return this.http.post(this.baseUrl + '/playlist', playList).pipe(map((resp) => {
      return resp;
    }));
  }

  //Delete Sub Category
  deletePlayList(playList: PlayList) {
    var token = this.auth.getToken();
    playList['token'] = token;
    return this.http.post(this.baseUrl + '/playlist', playList).pipe(map((resp) => {
      return resp;
    }));
  }
}