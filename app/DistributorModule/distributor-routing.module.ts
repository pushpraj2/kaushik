import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductOrderComponent } from './product-orders/new-product-orders.component';
import { DistributorHomeComponent } from './distributor-home/distributor-home.component';
import { DistributorAddressesComponent } from './distributor-addresses/distributor-addresses.component';
const routes: Routes = [
  { path: "distributorhome", component: DistributorHomeComponent },
  { path: "productorder", component: ProductOrderComponent },
  { path: "distributoraddress", component: DistributorAddressesComponent },
  { path: "**", redirectTo: '/productorder', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DistributorRoutingModule { }
