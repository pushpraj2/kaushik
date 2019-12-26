import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Distributor } from '../Models/distributor';

@Injectable({
  providedIn: 'root'
})
export class DistributorsService {
  constructor(private httpClient: HttpClient) {
  }

  AddDistributor(distributor: Distributor): Observable<boolean> {
    distributor.creationDateTime = new Date().toLocaleDateString();
    distributor.lastModifiedDateTime = new Date().toLocaleDateString();
    distributor.distributorID = this.uuidv4();
    return this.httpClient.post<boolean>(`/api/distributors`, distributor);
  }

  UpdateDistributor(distributor: Distributor): Observable<boolean> {
    distributor.lastModifiedDateTime = new Date().toLocaleDateString();
    return this.httpClient.put<boolean>(`/api/distributors`, distributor);
  }

  DeleteDistributor(distributorID: string, id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`/api/distributors/${id}`);
  }

  GetAllDistributors(): Observable<Distributor[]> {
    return this.httpClient.get<Distributor[]>(`/api/distributors`);
  }

  GetDistributorByDistributorID(DistributorID: number): Observable<Distributor> {
    return this.httpClient.get<Distributor>(`/api/distributors?distributorID=${DistributorID}`);
  }

  GetDistributorsByDistributorName(DistributorName: string): Observable<Distributor[]> {
    return this.httpClient.get<Distributor[]>(`/api/distributors?distributorName=${DistributorName}`);
  }

  GetDistributorByEmail(Email: string): Observable<Distributor> {
    return this.httpClient.get<Distributor>(`/api/distributors?email=${Email}`);
  }

  GetDistributorByEmailAndPassword(Email: string, Password: string): Observable<Distributor> {
    return this.httpClient.get<Distributor>(`/api/distributors?email=${Email}&password=${Password}`);
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
