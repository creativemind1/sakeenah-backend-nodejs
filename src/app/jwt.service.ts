import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import {Login} from './login/login';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  companyId=environment.companyId;
  baseUrl = environment.baseUrl;
  loginUrl = environment.loginUrl;
  
  constructor(private http:HttpClient) { }

   //Login 
   loginCMS(login:Login){
    return this.http.post(this.loginUrl+'/login',login).pipe(map((resp)=>{
      var result=JSON.parse(JSON.stringify(resp));
      localStorage.setItem('access_token', result.token);
      return resp;
    }));
   }; 
   //LogOut
   logout() {
    localStorage.removeItem('access_token');
  }
   public get loggedIn(): boolean{
     console.log('=== loggedIn ===',localStorage.getItem('access_token') !==  null );
    return localStorage.getItem('access_token') !==  null;
  }
//   login(email:string, password:string) {
//     return this.httpClient.post<{access_token:  string}>('http://www.your-server.com/auth/login', {email, password}).pipe(tap(res => {
//     localStorage.setItem('access_token', res.access_token);
// }))
// }
}
