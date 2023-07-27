import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent {
  constructor(private router: Router) { }
  

  appointment(){
    
    this.router.navigate(['/appointment']);
  }
  

}
