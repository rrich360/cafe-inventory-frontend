import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html'
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: any = FormGroup;
  hideOld = true;
  hideNew = true;
  hideConfirm = true;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private router: Router,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      currentUsername: [null, Validators.required],
      currentPassword: [null, Validators.required],
      newPassword: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, Validators.required]
    });
  }

  validateSubmit(): boolean {
    return (
      this.changePasswordForm.controls['newPassword'].value !==
      this.changePasswordForm.controls['confirmPassword'].value
    );
  }

  cancel() {
    this.router.navigate(['/cafe/dashboard']);
  }

  handleSubmit() {
    this.ngxService.start();
    const data = {
      currentUsername: this.changePasswordForm.controls['currentUsername'].value,
      currentPassword: this.changePasswordForm.controls['currentPassword'].value,
      newPassword: this.changePasswordForm.controls['newPassword'].value,
      confirmPassword: this.changePasswordForm.controls['confirmPassword'].value
    };
    this.userService.changePassword(data).subscribe(
      (res: any) => {
        this.ngxService.stop();
        this.snackbarService.openSnackBar('Password changed successfully!', GlobalConstants.success);
        this.router.navigate(['/cafe/dashboard']);
      },
      (error: any) => {
        this.ngxService.stop();
        this.snackbarService.openSnackBar('Password change unsuccessful! Check credentials!', GlobalConstants.error);
      }
    );
  }
}
