import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';
import { Login } from './login/login';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class JwtService {
  companyId = environment.companyId;
  baseUrl = environment.baseUrl;
  loginUrl = environment.loginUrl;

  constructor(private http: HttpClient, private auth: AuthService) { }

  //Login 
  loginCMS(login: Login) {
    return this.http.post(this.loginUrl + '/login', login).pipe(map((resp) => {
      var result = JSON.parse(JSON.stringify(resp));
      var timestamp = new Date().getTime();
      var token = result.token + '/##/' + timestamp;
      this.auth.sendToken(token)
      return resp;
    }));
  };
  //LogOut
  logout() {
    localStorage.removeItem('access_token');
  }
  public get loggedIn(): boolean {
    var getToken = localStorage.getItem('access_token');
    getToken = getToken.split('/##/')[0];
    return getToken !== null;
  }
//   login(email:string, password:string) {
//     return this.httpClient.post<{access_token:  string}>('http://www.your-server.com/auth/login', {email, password}).pipe(tap(res => {
//     localStorage.setItem('access_token', res.access_token);
// }))
// }
}
