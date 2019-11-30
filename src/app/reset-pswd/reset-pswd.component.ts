import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../login/login';
import { CmsService } from '../cms.service';

@Component({
  selector: 'app-reset-pswd',
  templateUrl: './reset-pswd.component.html',
  styleUrls: ['./reset-pswd.component.css']
})
export class ResetPswdComponent implements OnInit {

  constructor(private router: Router, private cmsService: CmsService) { }
  login: Login = new Login();
  ngOnInit() {
  }
  onReset(resetData: Login) {
    resetData['type'] = 'B2E';
    if (!resetData.emailId && !resetData.password) {
      alert('Something wrong with your credentials');
    }
    else {
      this.cmsService.resetPswd(resetData).subscribe(response => {
        var result = JSON.parse(JSON.stringify(response));
        if (result.status == 'SUCCESS') {
          this.router.navigate(['/login']);
          alert('If you are email address is correct, you will get email to verify.')
        } else {
          alert('Something wrong with your credentials');
        }
      });
    }
  }
}
