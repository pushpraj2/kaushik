import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SystemUserRoutingModule } from './system-user-routing.module';
import { SystemUserHomeComponent } from './system-user-home/system-user-home.component';
import { RawMaterialsComponent } from './raw-materials/raw-materials.component';
import { ProductsComponent } from './products/products.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { DistributorsComponent } from './distributors/distributors.component';
import { NewOrderComponent } from './raw-material-orders/raw-material-orders.component';

@NgModule({
  declarations: [
    SystemUserHomeComponent,
    RawMaterialsComponent,
    SuppliersComponent,
    DistributorsComponent,
    NewOrderComponent,
    ProductsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SystemUserRoutingModule
  ],
  exports: [
    SystemUserRoutingModule,
    SystemUserHomeComponent,
    RawMaterialsComponent,
    SuppliersComponent,
    DistributorsComponent,
    NewOrderComponent,
    ProductsComponent
  ]
})
export class SystemUserModule { }

