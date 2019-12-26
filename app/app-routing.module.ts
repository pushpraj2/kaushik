import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { AboutComponent } from './Components/about/about.component';


const routes: Routes = [
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "login", component: LoginComponent },
  { path: "about", component: AboutComponent },
  { path: "admin", loadChildren: () => import("./AdminModule/admin.module").then(m => m.AdminModule) },
  { path: "supplier", loadChildren: () => import("./SupplierModule/supplier.module").then(m => m.SupplierModule) },
  { path: "distributor", loadChildren: () => import("./DistributorModule/distributor.module").then(m => m.DistributorModule) },
  { path: "systemuser", loadChildren: () => import("./SystemUserModule/system-user.module").then(m => m.SystemUserModule) },
  { path: "**", redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }


