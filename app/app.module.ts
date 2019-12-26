import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { AboutComponent } from './Components/about/about.component';
import { LoginComponent } from './Components/login/login.component';
import { AdminModule } from './AdminModule/admin.module';
import { InventoryDataService } from './InMemoryWebAPIServices/suppliers-data.service';
import { SupplierModule } from './SupplierModule/supplier.module';
import { SystemUserModule } from './SystemUserModule/system-user.module';
import { DistributorModule } from './DistributorModule/distributor.module';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientInMemoryWebApiModule.forRoot(InventoryDataService, { delay: 1000 }),
    AdminModule,
    SupplierModule,
    DistributorModule,
    SystemUserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

