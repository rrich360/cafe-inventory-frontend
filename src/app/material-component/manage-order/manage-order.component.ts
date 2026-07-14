import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { StockOrderService } from 'src/app/services/stock-order.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html',
  styleUrls: ['./manage-order.component.scss']
})
export class ManageOrderComponent implements OnInit {
  storeDetailsForm: any = FormGroup;
  vendorDetailsForm: any = FormGroup;
  productForm: any = FormGroup;

  categorys: any = [];
  products: any = [];
  tableData: any = [];
  cols: any;
  totalAmount: number = 0;
  responseMessage: any;
  paymentMethods: string[] = ['Cash', 'Credit Card', 'Debit Card'];

  displayedColumns: string[] = ['name', 'category', 'price', 'quantity', 'total', 'delete'];

  constructor(
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private productService: ProductService,
    private stockOrderService: StockOrderService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.getCategorys();
    this.initForms();
  }

  initForms() {
    this.storeDetailsForm = this.formBuilder.group({
      name: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.mobileNumberRegex)]],
      paymentMethod: [null, Validators.required]
    });

    this.vendorDetailsForm = this.formBuilder.group({
      vendorName: [null, [Validators.required, Validators.pattern(GlobalConstants.nameRegex)]],
      vendorEmail: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      billingAddress: [null, Validators.required]
    });

    this.productForm = this.formBuilder.group({
      category: [null, Validators.required],
      product: [null, Validators.required],
      price: [null, Validators.required],
      quantity: [null, [Validators.required, Validators.min(1)]],
      total: [0]
    });
  }

  getCategorys() {
    this.categoryService.getCategorys().subscribe(
      (res: any) => {
        this.ngxService.stop();
        this.categorys = res;
      },
      (error: any) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

  getProductsByCategory(value: any) {
    this.productForm.controls['product'].setValue(null);
    this.productForm.controls['price'].setValue(null);
    this.productForm.controls['quantity'].setValue(null);
    this.productForm.controls['total'].setValue(0);
    this.ngxService.start();
    this.productService.getProductsByCategory(value.id).subscribe(
      (res: any) => {
        this.ngxService.stop();
        this.products = res;
      },
      (error: any) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

  getProductDetails(value: any) {
    this.productForm.controls['price'].setValue(value.price);
    this.productForm.controls['quantity'].setValue(null);
    this.productForm.controls['total'].setValue(0);
  }

  setQuantity(value: any) {
    const qty = this.productForm.controls['quantity'].value;
    const price = this.productForm.controls['price'].value;
    if (qty > 0 && price > 0) {
      this.productForm.controls['total'].setValue(qty * price);
    }
  }

  validateProductAdd(): boolean {
    if (
      !this.productForm.controls['product'].value ||
      !this.productForm.controls['price'].value ||
      !this.productForm.controls['quantity'].value ||
      this.productForm.controls['quantity'].value <= 0
    ) {
      return true;
    }
    return false;
  }

  addProduct() {
    const product = this.productForm.controls['product'].value;
    const category = this.productForm.controls['category'].value;
    const qty = this.productForm.controls['quantity'].value;
    const price = this.productForm.controls['price'].value;
    const total = qty * price;

    const existing = this.tableData.find((item: any) => item.id === product.id);
    if (existing) {
      existing.quantity = existing.quantity + qty;
      existing.total = existing.quantity * existing.price;
    } else {
      this.tableData.push({
        id: product.id,
        name: product.name,
        category: category.name,
        price: price,
        quantity: qty,
        total: total
      });
    }

    this.tableData = [...this.tableData];
    this.totalAmount = this.tableData.reduce((acc: number, item: any) => acc + item.total, 0);
    this.snackbarService.openSnackBar('Product added.', GlobalConstants.success);
  }

  handleDeleteProduct(index: number) {
    this.tableData.splice(index, 1);
    this.tableData = [...this.tableData];
    this.totalAmount = this.tableData.reduce((acc: number, item: any) => acc + item.total, 0);
  }

  validateOrder(): boolean {
    if (!this.storeDetailsForm.valid || !this.vendorDetailsForm.valid || this.tableData.length === 0) {
      return true;
    }
    return false;
  }

  submitOrder() {
    this.ngxService.start();
    const formData = this.storeDetailsForm.value;
    const vendorData = this.vendorDetailsForm.value;

    const data = {
      companyName: formData.name,
      email: formData.email,
      contactNumber: formData.contactNumber,
      paymentMethod: formData.paymentMethod,
      vendorName: vendorData.vendorName,
      vendorEmail: vendorData.vendorEmail,
      billingAddress: vendorData.billingAddress,
      totalValue: this.totalAmount,
      orderDetails: JSON.stringify(this.tableData.map((item: any) => ({
        'stock item': item.name,
        category: item.category,
        quantity: String(item.quantity),
        price: item.price,
        total: item.total
      })))
    };

    this.stockOrderService.generateReport(data).subscribe(
      (res: any) => {
        this.downloadPdf(res?.uuid);
        this.snackbarService.openSnackBar('Stock Order generated successfully!', GlobalConstants.success);
      },
      (error: any) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

  downloadPdf(uuid: string) {
    this.stockOrderService.getPdf({ uuid }).subscribe(
      (res: any) => {
        this.ngxService.stop();
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `SO_${uuid}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.resetForms();
      },
      (error: any) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

  resetForms() {
    this.storeDetailsForm.reset();
    this.vendorDetailsForm.reset();
    this.productForm.reset();
    this.tableData = [];
    this.totalAmount = 0;
  }
}
