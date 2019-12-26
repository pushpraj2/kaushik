import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { ProductOrderDetail } from '../Models/product-order-detail';

@Injectable({
  providedIn: 'root'
})
export class ProductOrderDetailsService {
  constructor(private httpClient: HttpClient) {
  }

  AddProductOrderDetail(productOrderdetail: ProductOrderDetail): Observable<boolean> {
    productOrderdetail.creationDateTime = new Date().toLocaleDateString();
    productOrderdetail.lastModifiedDateTime = new Date().toLocaleDateString();
    productOrderdetail.productorderDetailID = this.uuidv4();
    return this.httpClient.post<boolean>(`/api/productorderdetails`, productOrderdetail);
  }

  UpdateProductOrderDetail(ProductOrderdetail: ProductOrderDetail): Observable<boolean> {
    ProductOrderdetail.lastModifiedDateTime = new Date().toLocaleDateString();
    return this.httpClient.put<boolean>(`/api/productorderdetails`, ProductOrderdetail);
  }

  DeleteProductOrderDetail(ProductOrderDetailID: string, id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`/api/productorderdetails/${id}`);
  }

  GetAllProductOrderDetails(): Observable<ProductOrderDetail[]> {
    return this.httpClient.get<ProductOrderDetail[]>(`/api/productorderdetails`);
  }

  GetProductOrderDetailByProductOrderDetailID(ProductOrderDetailID: string): Observable<ProductOrderDetail> {
    return this.httpClient.get<ProductOrderDetail>(`/api/productorderdetails?  productorderDetailID=${ProductOrderDetailID}`);
  }

  GetProductOrderDetailByProductOrderID(ProductOrderID: string): Observable<ProductOrderDetail[]> {
    return this.httpClient.get<ProductOrderDetail[]>(`/api/productorderdetails?productorderID=${ProductOrderID}`);
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
