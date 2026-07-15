import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { SnackbarService } from '../services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: any = FormGroup;
  responseMessage: any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private ngxService: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.forgotPasswordForm = this.formBuilder.group({
      username: [null, [Validators.required, Validators.pattern(GlobalConstants.usernameRegex)]],
      mobileNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.mobileNumberRegex)]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  validateSubmit(): boolean {
    return this.forgotPasswordForm.controls['newPassword'].value !==
      this.forgotPasswordForm.controls['confirmPassword'].value;
  }

  handleSubmit(): void {
    this.ngxService.start();
    const formData = this.forgotPasswordForm.value;
    const data = {
      username: formData.username,
      mobileNumber: formData.mobileNumber,
      newPassword: formData.newPassword,
      confirmPassword: formData.confirmPassword
    };
    this.userService.forgotPassword(data).subscribe((response: any) => {
      this.ngxService.stop();
      this.responseMessage = response?.message;
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.success);
      this.router.navigate(['/sign-in']);
    }, (error) => {
      this.ngxService.stop();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      } else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    });
  }
}
