import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import {Category} from './category/category';

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
   //Save New Category
   saveNewCategory(category:Category){
    console.log("Service Category"+category.name);
    category.companyId=this.companyId;
    return this.http.post(this.baseUrl+'/category',category).pipe(map((resp)=>{
      console.log('=== successfully saved ====',resp);
      return resp;
    }));
   }
   
}
