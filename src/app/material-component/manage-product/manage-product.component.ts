import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductComponent } from '../dialog/product/product.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html',
  styleUrls: ['./manage-product.component.scss']
})
export class ManageProductComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'categoryName', 'description', 'price', 'edit'];
  dataSource: any;
  responseMessage: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private productService: ProductService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  ngAfterViewInit() {}

  tableData() {
    this.productService.getAllProducts().subscribe(
      (res: any) => {
        this.ngxService.stop();
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (error: any) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleAddAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { action: 'Add' };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(() => dialogRef.close());
    dialogRef.afterClosed().subscribe(() => {
      this.tableData();
    });
  }

  handleEditAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { action: 'Edit', data: values };
    dialogConfig.width = '850px';
    const dialogRef = this.dialog.open(ProductComponent, dialogConfig);
    this.router.events.subscribe(() => dialogRef.close());
    dialogRef.afterClosed().subscribe(() => {
      this.tableData();
    });
  }

  handleDeleteAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: `Are you sure you want to delete product "${values.name}"?`
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.ngxService.start();
        this.deleteProduct(values.id);
      }
    });
  }

  deleteProduct(id: any) {
    this.productService.deleteProduct(id).subscribe(
      (res: any) => {
        this.ngxService.stop();
        this.tableData();
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
