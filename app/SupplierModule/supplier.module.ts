import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SupplierRoutingModule } from './supplier-routing.module';
import { SupplierHomeComponent } from './supplier-home/supplier-home.component';
import { SupplierAddressComponent } from './supplier-addresses/supplier-addresses.component';

@NgModule({
  declarations: [
    SupplierAddressComponent,
    SupplierHomeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SupplierRoutingModule
  ],
  exports: [
    SupplierRoutingModule,
    SupplierAddressComponent,
    SupplierHomeComponent
  ]
})
export class SupplierModule { }

