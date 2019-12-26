import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SystemUsersComponent } from './system-users/system-users.component';


const routes: Routes = [
  { path: "home", component: AdminHomeComponent },
  { path: "systemuser", component: SystemUsersComponent },
  { path: "**", redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }


