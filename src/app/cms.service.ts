import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import {Category} from './category/category';
import {SubCategory} from './subcategory/subcategory';
import {Login} from './login/login';
import { Media } from './meida/media';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  companyId=environment.companyId;
  baseUrl = environment.baseUrl;
 
  constructor(private http:HttpClient) {

   }
   // Load all the categories based on the company Id
   getCategories(){
    return this.http.post(this.baseUrl+'/category',{"type": "LOAD",
    "companyId":this.companyId}).pipe(map((resp)=>{
      return resp;
    }));
   };
   //Save or Update Category
   saveOrupdateCategory(category:Category){
    category.companyId=this.companyId;
    return this.http.post(this.baseUrl+'/category',category).pipe(map((resp)=>{
      return resp;
    }));
   };
      //Delete Category
    deleteCategory(category:Category){
       return this.http.post(this.baseUrl+'/category',category).pipe(map((resp)=>{
         return resp;
       }));
      };

      //Delete Category
      loginCMS(login:Login){
        console.log('==== cms ====',login);
        return this.http.post(this.baseUrl+'/login',login).pipe(map((resp)=>{
          return resp;
        }));
       };  
   // Load all the Sub categories based on the company Id
   getAllSubCategories(){
    return this.http.post(this.baseUrl+'/subcategory',{"type": "LOAD",
    "companyId":this.companyId}).pipe(map((resp)=>{
      console.log('==== Loaded ====',resp);
      return resp;
    }));
   };
   //Save or Update Sub Category
   saveOrupdateSubCategory(subCategory:SubCategory){
    subCategory.companyId=this.companyId;
    return this.http.post(this.baseUrl+'/subcategory',subCategory).pipe(map((resp)=>{
      return resp;
    }));
   };
      //Delete Sub Category
    deleteSubCategory(subCategory:SubCategory){
       return this.http.post(this.baseUrl+'/subcategory',subCategory).pipe(map((resp)=>{
         return resp;
       }));
      };

       // Load all the Media based on the company Id
   getAllMedia(){
    return this.http.post(this.baseUrl+'/media',{"type": "LOAD",
    "companyId":this.companyId}).pipe(map((resp)=>{
      return resp;
    }));
   };
   //Save or Update Sub Category
   saveOrupdateMedia(media:Media){
    media.companyId=this.companyId;
    return this.http.post(this.baseUrl+'/media',media).pipe(map((resp)=>{
      return resp;
    }));
   };
      //Delete Sub Category
    deleteMedia(media:Media){
       return this.http.post(this.baseUrl+'/media',media).pipe(map((resp)=>{
         return resp;
       }));
      };
}
