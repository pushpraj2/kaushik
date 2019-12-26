import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductOrderComponent } from './product-orders/new-product-orders.component';
import { DistributorRoutingModule } from './distributor-routing.module';
import { DistributorHomeComponent } from './distributor-home/distributor-home.component';
import { DistributorAddressesComponent } from './distributor-addresses/distributor-addresses.component';
@NgModule({
  declarations: [
    ProductOrderComponent,
    DistributorHomeComponent,
    DistributorAddressesComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DistributorRoutingModule,

  ],
  exports: [
    DistributorRoutingModule,
    ProductOrderComponent,
    DistributorAddressesComponent
  ]
})
export class DistributorModule { }
