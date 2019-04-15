import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Login} from './login';
import {CmsService} from '../cms.service';
import {JwtService} from '../jwt.service';
//import { CATEGORY} from './mock-catego
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[CmsService,JwtService]
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private cmsService:CmsService,private jwtService:JwtService) { }
  login:Login = new Login();
 
  
  ngOnInit() {
  }
  onclick(){
    this.login['type']='B2E';
    console.log(' login clicked',this.login);

    this.jwtService.loginCMS(this.login).subscribe(response=>{
      var result=JSON.parse(JSON.stringify(response));
      if(result.status == 'SUCCESS'){
        this.router.navigate(['/category']);
      }else{
        // Invalid Credentials
      }
     
      });

    // this.cmsService.loginCMS(this.login).subscribe(response=>{
    //   var result=JSON.parse(JSON.stringify(response));
    //   if(result.status == 'SUCCESS'){
    //     this.router.navigate(['/category']);
    //   }else{
    //     // Invalid Credentials
    //   }
     
    //   });

   
  }

}
