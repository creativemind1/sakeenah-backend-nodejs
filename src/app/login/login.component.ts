import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from './login';
import { CmsService } from '../cms.service';
import { JwtService } from '../jwt.service';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from './.././auth.service';
//import { CATEGORY} from './mock-catego
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [CmsService, AuthService]
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, private cmsService: CmsService, private auth: AuthService) { }
  login: Login = new Login();
  ngOnInit() {
  }
  onclick() {
    if (this.login.emailId && this.login.password) {
      this.login['type'] = 'B2E';
      this.auth.loginCMS(this.login).subscribe(response => {
        var result = JSON.parse(JSON.stringify(response));
        if (result.status == 'SUCCESS') {
          this.router.navigate(['/media']);
        } else {
          alert('Something is wrong with your credentials')
        }
      });
    } else {
      alert('Error');
    }
  }
}
