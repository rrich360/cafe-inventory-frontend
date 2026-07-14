import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html'
})
export class ProductComponent implements OnInit {
  onAddProduct = 'Add';
  productForm: any = FormGroup;
  dialogAction: any = 'Add';
  categorys: any = [];
  responseMessage: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private categoryService: CategoryService,
    private dialogRef: MatDialogRef<ProductComponent>,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      inventory_category_id: [null, Validators.required],
      price: [null, [Validators.required]],
      description: [null, Validators.required]
    });
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.onAddProduct = 'Update';
      this.productForm.patchValue({
        name: this.dialogData.data.name,
        inventory_category_id: this.dialogData.data.inventory_category_id,
        price: this.dialogData.data.price,
        description: this.dialogData.data.description
      });
    }
    this.getCategorys();
  }

  getCategorys() {
    this.categoryService.getCategorys().subscribe(
      (res: any) => { this.categorys = res; },
      (error: any) => {
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.editProduct();
    } else {
      this.addProduct();
    }
  }

  addProduct() {
    this.ngxService.start();
    const data = {
      name: this.productForm.controls['name'].value,
      inventory_category_id: String(this.productForm.controls['inventory_category_id'].value),
      price: String(this.productForm.controls['price'].value),
      description: this.productForm.controls['description'].value
    };
    this.productService.addNewProduct(data).subscribe(
      (res: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.snackbarService.openSnackBar(res?.message || 'Product added.', GlobalConstants.success);
      },
      (error: any) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

  editProduct() {
    this.ngxService.start();
    const data = {
      id: this.dialogData.data.id,
      name: this.productForm.controls['name'].value,
      inventory_category_id: String(this.productForm.controls['inventory_category_id'].value),
      price: String(this.productForm.controls['price'].value),
      description: this.productForm.controls['description'].value
    };
    this.productService.updateProduct(data).subscribe(
      (res: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        this.snackbarService.openSnackBar(res?.message || 'Product updated.', GlobalConstants.success);
      },
      (error: any) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }
}
