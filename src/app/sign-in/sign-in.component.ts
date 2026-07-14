import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from '../shared/global-constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  test : Date = new Date();
  focus: any;
  focus1: any;
  hide = true;
  signInForm:any = FormGroup;
  responseMessage:any;
   
  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private userService:UserService,
    private ngxService:NgxUiLoaderService,
    private snackbarService:SnackbarService) { }

  ngOnInit(): void {
    this.signInForm = this.formBuilder.group({
      username:[null,[Validators.required, Validators.pattern(GlobalConstants.usernameRegex)]],
      password:[null, [Validators.required]]
      })
  }

  handleSubmit(){
    this.ngxService.start();

    var formData = this.signInForm.value;
    var data = {
      username: formData.username,
      password: formData.password
    }

    this.userService.userSignIn(data).subscribe((res: any) => {
      this.ngxService.stop();
      localStorage.setItem('token', JSON.parse(res).token);
      this.router.navigate(['profile']);
    },
    (error) => {
      this.ngxService.stop();
      if(error.status === 401){
        this.responseMessage = GlobalConstants.badCredentialsError;
      } else if(error.error?.message){
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }
}