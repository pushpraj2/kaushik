import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DistributorAddress } from '../Models/distributor-address';

@Injectable({
  providedIn: 'root'
})
export class DistributoraddressesService {
  constructor(private httpClient: HttpClient) {
  }

  AddDistributorAddress(distributorAddress: DistributorAddress): Observable<boolean> {
    distributorAddress.creationDateTime = new Date().toLocaleDateString();
    distributorAddress.lastModifiedDateTime = new Date().toLocaleDateString();
    distributorAddress.distributorAddressID = this.uuidv4();
    return this.httpClient.post<boolean>(`/api/distributorAddresses`, distributorAddress);
  }

  UpdateDistributorAddress(distributorAddress: DistributorAddress): Observable<boolean> {
    distributorAddress.lastModifiedDateTime = new Date().toLocaleDateString();
    return this.httpClient.put<boolean>(`/api/distributorAddresses`, distributorAddress);
  }

  DeleteDistributorAddress(distributorAddressID: string, id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`/api/distributorAddresses/${id}`);
  }

  GetAllDistributorAddresses(): Observable<DistributorAddress[]> {
    return this.httpClient.get<DistributorAddress[]>(`/api/distributorAddresses`);
  }

  GetDistributorAddressByDistributorAddressID(DistributorAddressID: number): Observable<DistributorAddress> {
    return this.httpClient.get<DistributorAddress>(`/api/distributors?distributorID=${DistributorAddressID}`);
  }

  GetDistributorsByAddressLine1(AddressLine1: string): Observable<DistributorAddress[]> {
    return this.httpClient.get<DistributorAddress[]>(`/api/distributorAddresses?AddressLine1=${AddressLine1}`);
  }



  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
