import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-usernav',
  templateUrl: './usernav.component.html',
  styleUrls: ['./usernav.component.css']
})
export class UsernavComponent {

  constructor(private router: Router) { }
  // finddoctor(){
  //   this.router.navigate(['/appointment']);
  // }
  // userlogin(){
  //   this.router.navigate(['/user-login'])
  // }
}
