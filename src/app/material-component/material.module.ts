import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MaterialRoutes } from './material.routing';
import { MaterialModule } from '../shared/material-module';
import { ViewBillProductsComponent } from './dialog/view-bill-products/view-bill-products.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';

import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewStockOrdersComponent } from './view-stock-orders/view-stock-orders.component';
import { UsersComponent } from './users/users.component';
import { CategoryComponent } from './dialog/category/category.component';
import { ProductComponent } from './dialog/product/product.component';
import { ConfirmationComponent } from './dialog/confirmation/confirmation.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';


@NgModule({
  imports: [
    MatTabsModule,
    MatSidenavModule,
    CommonModule,
    RouterModule.forChild(MaterialRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
  ],
  exports: [
    MatTabsModule,
    MatSidenavModule
  ],
  providers: [],
  declarations: [
    ViewBillProductsComponent,
    ManageCategoryComponent,
    ManageProductComponent,
    ManageOrderComponent,
    ViewStockOrdersComponent,
    UsersComponent,
    CategoryComponent,
    ProductComponent,
    ConfirmationComponent,
    ChangePasswordComponent
  ],
  entryComponents: [
    ViewBillProductsComponent,
    CategoryComponent,
    ProductComponent,
    ConfirmationComponent
  ]
})
export class MaterialComponentsModule {}
