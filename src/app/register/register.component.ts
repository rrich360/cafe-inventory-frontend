import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';
import { error } from 'console';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  test : Date = new Date();
  focus: any;
  focus1: any;

  password = true;
  confirmPassword = true;
  registerForm:any = FormGroup;
  responseMessage: any;

  constructor( private formBuilder:FormBuilder, 
    private router:Router,
    private userService:UserService,
    private snackbarService:SnackbarService,
    private ngxService:NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name:[null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      username:[null,[Validators.required, Validators.pattern(GlobalConstants.usernameRegex)]],
      mobileNumber:[null,[Validators.required, Validators.pattern(GlobalConstants.mobileNumberRegex)]],
      password:[null, [Validators.required]],
      confirmPassword:[null, [Validators.required]]
    })
  }

  validateSubmit(){
    if(this.registerForm.controls['password'].value != this.registerForm.controls['confirmPassword'].value){
      return true;
    }else{
      return false;
    }
  }

  handleSubmit(){
    this.ngxService.start();
    var formData = this.registerForm.value;
    var data = {
      name: formData.name,
      username: formData.username,
      mobileNumber: formData.mobileNumber,
      password: formData.password,
    }
    this.userService.register(data).subscribe((response:any)=>{
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, "");
      this.router.navigate(['/']);
    }, (error)=> {
      this.ngxService.stop();
      if(error.error?.message){
        this.responseMessage = error.error?.message;
      }else{
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }



}
