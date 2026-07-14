import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html'
})
export class CategoryComponent implements OnInit {
  onAddCategory = 'Add';
  categoryForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any;
  responseMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<CategoryComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]]
    });
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.onAddCategory = 'Update';
      this.categoryForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.editCategory();
    } else {
      this.addCategory();
    }
  }

  addCategory() {
    this.ngxService.start();
    const data = { name: this.categoryForm.controls['name'].value };
    this.categoryService.addNewCategory(data).subscribe(
      (res: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.snackbarService.openSnackBar(res?.message, GlobalConstants.success);
      },
      (error: any) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

  editCategory() {
    this.ngxService.start();
    const data = {
      id: this.dialogData.data.id,
      name: this.categoryForm.controls['name'].value
    };
    this.categoryService.updateCategory(data).subscribe(
      (res: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.snackbarService.openSnackBar(res?.message, GlobalConstants.success);
      },
      (error: any) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }
}
