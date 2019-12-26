import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminRoutingModule } from './admin-routing.module';
import { SystemUsersComponent } from './system-users/system-users.component';

@NgModule({
  declarations: [
    AdminHomeComponent,
    SystemUsersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule
  ],
  exports: [
    AdminRoutingModule,
    AdminHomeComponent,
    SystemUsersComponent
  ]
})
export class AdminModule { }

