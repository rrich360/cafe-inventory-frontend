import { Component} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  //import router 
  constructor(private router: Router) { }

ngOnInit(): void { }

onMenuHomeClick(){
  //to do...perform logic
  //navigate to home page 
this.router.navigateByUrl('/home');
}

onSignInClick(){
  //to do...perform logic
  //navigate to sign in page 
this.router.navigate(['/sign-in']);
}

onMenuGetStartedClick(){
  //to do...perform logic
  //navigate to register page 
this.router.navigate(['/register']);
}

onMenuForgotPasswordClick() {
  //to do...perform logic
  //navigate to forgot-password page 
 this.router.navigate(['/forgot-password']);
}



}
