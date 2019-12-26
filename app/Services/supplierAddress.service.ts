import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SupplierAddress } from '../Models/supplier-address';

@Injectable({
  providedIn: 'root'
})
export class SupplierAddressService {
  constructor(private httpClient: HttpClient) {
  }

  AddSupplierAddress(supplierAddress: SupplierAddress): Observable<boolean> {
    supplierAddress.creationDateTime = new Date().toLocaleDateString();
    supplierAddress.lastModifiedDateTime = new Date().toLocaleDateString();
    supplierAddress.supplierAddressID = this.uuidv4();
    return this.httpClient.post<boolean>(`/api/supplierAddresses`, supplierAddress);
  }

  UpdateSupplierAddress(supplierAddress: SupplierAddress): Observable<boolean> {
    supplierAddress.lastModifiedDateTime = new Date().toLocaleDateString();
    return this.httpClient.put<boolean>(`/api/supplierAddresses`, supplierAddress);
  }

  DeleteSupplierAddress(addressLine1: string, id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`/api/supplierAddresses/${id}`);
  }

  GetAllSupplierAddresses(): Observable<SupplierAddress[]> {
    return this.httpClient.get<SupplierAddress[]>(`/api/supplierAddresses`);
  }

  GetSupplierAddressBySupplierAddressID(SupplierAddressID: number): Observable<SupplierAddress> {
    return this.httpClient.get<SupplierAddress>(`/api/supplierAddresses?supplierAddressID=${SupplierAddressID}`);
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}



