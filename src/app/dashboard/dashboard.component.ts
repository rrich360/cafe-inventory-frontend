import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from '../services/snackbar.service';
import { DashboardService } from '../services/dashboard.service';
import { GlobalConstants } from '../shared/global-constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  responseMessage: any;
  totalCategories: any = 0;
  totalProducts: any = 0;
  totalStockOrders: any = 0;

  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private ngxService: NgxUiLoaderService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.dashboardData();
  }

  ngAfterViewInit() {}

  dashboardData() {
    this.dashboardService.getDetails().subscribe(
      (res: any) => {
        this.ngxService.stop();
        this.totalCategories = res['inventory categories'] ?? 0;
        this.totalProducts = res['inventory item(s)'] ?? 0;
        this.totalStockOrders = res['stock order(s)'] ?? 0;
      },
      (error: any) => {
        this.ngxService.stop();
        this.responseMessage = error.error?.message || GlobalConstants.genericError;
        this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
      }
    );
  }

  navigateTo(path: string) {
    this.router.navigate([path]);
  }
}
