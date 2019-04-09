import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
//import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  companyId:"10000";

  constructor(private http:HttpClient) {

   }
   // Load all the categories based on the company Id
   getCategories(){
     console.log('=== get categories',this.http.post('/api/category',{"type": "LOAD",
     "companyId":this.companyId}));

     return this.http.post('/api/category',{"type": "LOAD",
     "companyId":this.companyId});
   }
}
