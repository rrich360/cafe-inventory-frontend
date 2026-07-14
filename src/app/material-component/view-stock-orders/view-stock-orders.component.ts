import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { StockOrderService } from 'src/app/services/stock-order.service';
import { RouteGuardService } from 'src/app/services/route-guard.service';
import { ViewBillProductsComponent } from '../dialog/view-bill-products/view-bill-products.component';
import { ConfirmationComponent } from '../dialog/confirmation/confirmation.component';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-view-stock-orders',
  templateUrl: './view-stock-orders.component.html',
  styleUrls: ['./view-stock-orders.component.scss']
})
export class ViewStockOrdersComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'email', 'contactNumber', 'paymentMethod', 'total', 'view'];
  dataSource: any;
  responseMessage: any;
  role: any;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private stockOrderService: StockOrderService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private routeGuard: RouteGuardService
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.role = this.routeGuard.getRole();
    this.tableData();
  }

  ngAfterViewInit() {}

  tableData() {
    this.stockOrderService.getStockOrders().subscribe(
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

  handleViewAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { data: values };
    dialogConfig.width = '100%';
    this.dialog.open(ViewBillProductsComponent, dialogConfig);
  }

  handleDownloadPdfAction(values: any) {
    this.ngxService.start();
    const data = { uuid: values.uuid };
    this.stockOrderService.getPdf(data).subscribe(
      (res: any) => {
        this.ngxService.stop();
        const blob = new Blob([res], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `SO_${values.uuid}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
      },
      (error: any) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

  handleDeleteAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: `Are you sure you want to delete Stock Order for "${values.companyName}"?`
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.ngxService.start();
        this.deleteStockOrder(values.id);
      }
    });
  }

  deleteStockOrder(id: any) {
    this.stockOrderService.deleteStockOrder(id).subscribe(
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
