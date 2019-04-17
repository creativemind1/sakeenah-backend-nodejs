import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import {Category} from './category/category';
import {SubCategory} from './subcategory/subcategory';
import {Login} from './login/login';
import { Media } from './meida/media';
import { JwtService } from './jwt.service';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  companyId=environment.companyId;
  baseUrl = environment.baseUrl;
  uploadUrl = environment.uploadUrl;
 
  constructor(private http:HttpClient,private jwtService:JwtService) {

   }
   // Load all the categories based on the company Id
   getCategories(){
    var token =localStorage.getItem('access_token');
    return this.http.post(this.baseUrl+'/category',{"type": "LOAD",
    "companyId":this.companyId,'token':token}).pipe(map((resp)=>{
      return resp;
    }));
   };
   //Save or Update Category
   saveOrupdateCategory(category:Category){
    var token =localStorage.getItem('access_token');
    category['token']=token;
    category.companyId=this.companyId;
    
    
    return this.http.post(this.baseUrl+'/category',category).pipe(map((resp)=>{
      return resp;
    }));
   };
      //Delete Category
    deleteCategory(category:Category){
      var token =localStorage.getItem('access_token');
    category['token']=token;
       return this.http.post(this.baseUrl+'/category',category).pipe(map((resp)=>{
         return resp;
       }));
      };

      
   // Load all the Sub categories based on the company Id
   getAllSubCategories(){
    var token =localStorage.getItem('access_token');
    return this.http.post(this.baseUrl+'/subcategory',{"type": "LOAD",
    "companyId":this.companyId,'token':token}).pipe(map((resp)=>{
      return resp;
    }));
   };
   //Save or Update Sub Category
   saveOrupdateSubCategory(subCategory:SubCategory){
    subCategory.companyId=this.companyId;
    var token =localStorage.getItem('access_token');
    subCategory['token']=token;
    return this.http.post(this.baseUrl+'/subcategory',subCategory).pipe(map((resp)=>{
      return resp;
    }));
   };
      //Delete Sub Category
    deleteSubCategory(subCategory:SubCategory){
      var token =localStorage.getItem('access_token');
      subCategory['token']=token;
       return this.http.post(this.baseUrl+'/subcategory',subCategory).pipe(map((resp)=>{
         return resp;
       }));
      };

       // Load all the Media based on the company Id
   getAllMedia(){
    var token =localStorage.getItem('access_token');
    return this.http.post(this.baseUrl+'/media',{"type": "LOAD",
    "companyId":this.companyId,'token':token}).pipe(map((resp)=>{
      return resp;
    }));
   };
   //Save or Update Sub Category
   saveOrupdateMedia(media:Media){
    media.companyId=this.companyId;
    var token =localStorage.getItem('access_token');
    media['token']=token;
    return this.http.post(this.baseUrl+'/media',media).pipe(map((resp)=>{
      return resp;
    }));
   };
      //Delete Sub Category
    deleteMedia(media:Media){
      var token =localStorage.getItem('access_token');
     media['token']=token;
       return this.http.post(this.baseUrl+'/media',media).pipe(map((resp)=>{
         return resp;
       }));
      };

       //Delete Sub Category
    upload(formData:FormData){
         
      return this.http.post(this.uploadUrl,formData).pipe(map((resp)=>{
        return resp;
      }));
      };
}
