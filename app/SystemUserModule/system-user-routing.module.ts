import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SystemUserHomeComponent } from './system-user-home/system-user-home.component';
import { RawMaterialsComponent } from './raw-materials/raw-materials.component';
import { ProductsComponent } from './products/products.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { DistributorsComponent } from './distributors/distributors.component';
import { NewOrderComponent } from './raw-material-orders/raw-material-orders.component';


const routes: Routes = [
  { path: "systemuserhome", component: SystemUserHomeComponent },
  { path: "rawmaterial", component: RawMaterialsComponent },
  { path: "product", component: ProductsComponent },
  { path: "supplier", component: SuppliersComponent },
  { path: "distributor", component: DistributorsComponent },
  { path: "newrmorder", component: NewOrderComponent },
  { path: "**", redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemUserRoutingModule { }


