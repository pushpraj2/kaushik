import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Order } from '../Models/order';
import { ProductOrder } from '../Models/product-order';

@Injectable({
  providedIn: 'root'
})
export class ProductOrdersService {
  constructor(private httpClient: HttpClient) {
  }

  AddProductOrder(productorder: ProductOrder): Observable<boolean> {
    productorder.creationDateTime = new Date().toLocaleDateString();
    productorder.lastModifiedDateTime = new Date().toLocaleDateString();
    productorder.productorderID = this.uuidv4();
    return this.httpClient.post<boolean>(`/api/productorders`, productorder);
  }

  UpdateProductOrder(productorder: ProductOrder): Observable<boolean> {
    productorder.lastModifiedDateTime = new Date().toLocaleDateString();
    return this.httpClient.put<boolean>(`/api/productorders`, productorder);
  }

  DeleteProductOrder(orderID: string, id: number): Observable<boolean> {
    return this.httpClient.delete<boolean>(`/api/productorders/${id}`);
  }

  GetAllProductOrders(): Observable<ProductOrder[]> {
    return this.httpClient.get<ProductOrder[]>(`/api/productorders`);
  }

  GetOrderByOrderID(OrderID: number): Observable<ProductOrder> {
    return this.httpClient.get<ProductOrder>(`/api/productorders?id=${OrderID}`);
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
