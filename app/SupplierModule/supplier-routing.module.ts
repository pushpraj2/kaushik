import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierAddressComponent } from './supplier-addresses/supplier-addresses.component';
import { SupplierHomeComponent } from './supplier-home/supplier-home.component';



const routes: Routes = [
  { path: "supplierHome", component: SupplierHomeComponent },
  { path: "supplierAddress", component: SupplierAddressComponent },
  { path: "**", redirectTo: '/supplierHome', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplierRoutingModule { }

