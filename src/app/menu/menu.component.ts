import { Component, OnInit } from '@angular/core';
import {JwtService} from '../jwt.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private jwtService:JwtService,private router:Router) { }

  ngOnInit() {
  }
  onLogout(){
    this.jwtService.logout();
    console.log('=== Logout Clicked ===',this.jwtService.loggedIn);
    if(!this.jwtService.loggedIn){
      this.router.navigate(['/login']);
    }else{
      // Invalid Credentials
    }
  }
}
