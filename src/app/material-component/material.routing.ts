import { Routes } from '@angular/router';
import { ManageCategoryComponent } from './manage-category/manage-category.component';
import { ManageProductComponent } from './manage-product/manage-product.component';
import { ManageOrderComponent } from './manage-order/manage-order.component';
import { ViewStockOrdersComponent } from './view-stock-orders/view-stock-orders.component';
import { UsersComponent } from './users/users.component';
import { ChangePasswordComponent } from './dialog/change-password/change-password.component';

export const MaterialRoutes: Routes = [
  { path: 'category', component: ManageCategoryComponent },
  { path: 'product', component: ManageProductComponent },
  { path: 'order', component: ManageOrderComponent },
  { path: 'viewstockorders', component: ViewStockOrdersComponent },
  { path: 'users', component: UsersComponent },
  { path: 'change-password', component: ChangePasswordComponent }
];
