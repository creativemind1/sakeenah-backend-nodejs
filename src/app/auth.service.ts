import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Login } from './login/login';
import { environment } from '../environments/environment';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService {
  companyId = environment.companyId;
  baseUrl = environment.baseUrl;
  loginUrl = environment.loginUrl;
  constructor(private http: HttpClient, private myRoute: Router) { }
  
  loginCMS(login: Login) {
    return this.http.post(this.loginUrl + '/login', login).pipe(map((resp) => {
      var result = JSON.parse(JSON.stringify(resp));
      var timestamp = new Date().getTime();
      var token = result.token + '/##/' + timestamp;
      this.sendToken(token)
      return resp;
    }));
  };
  sendToken(token: string) {
    localStorage.setItem("access_token", token)
  }
  getToken() {
    var mainToken = localStorage.getItem('access_token');
    if (mainToken)  {
      var getToken = mainToken.split('/##/')[0];
      var tokenTime = mainToken.split('/##/')[1];
      var currentTime = new Date().getTime();
      if ((currentTime - parseInt(tokenTime)) < 24 * 60 * 60 * 1000)  return getToken;
      else return false
    }
  }
  isLoggedIn() {
    var value = this.getToken();
    if (value) return value;
    else {
      localStorage.removeItem("access_token");
    }
  }
  logout() {
    localStorage.removeItem("access_token");
    this.myRoute.navigate(["login"]);
  }
}
