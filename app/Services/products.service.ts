import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../Models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductsService
{
  constructor(private httpClient: HttpClient)
  {
  }

  AddProduct(product: Product): Observable<boolean>
  {
    product.creationDateTime = new Date().toLocaleDateString();
    product.lastModifiedDateTime = new Date().toLocaleDateString();
    product.productID = this.uuidv4();
    return this.httpClient.post<boolean>(`/api/products`, product);
  }

  UpdateProduct(product: Product): Observable<boolean>
  {
    product.lastModifiedDateTime = new Date().toLocaleDateString();
    return this.httpClient.put<boolean>(`/api/products`, product);
  }

  DeleteProduct(ProductID: string, ID: number): Observable<boolean>
  {
    return this.httpClient.delete<boolean>(`/api/products/${ID}`);
  }

  GetAllProducts(): Observable<Product[]>
  {
    return this.httpClient.get<Product[]>(`/api/products`);
  }

  GetProductByProductID(ProductID: number): Observable<Product>
  {
    return this.httpClient.get<Product>(`/api/products?productID=${ProductID}`);
  }

  GetProductsByProductName(ProductName: string): Observable<Product>
  {
    return this.httpClient.get<Product>(`/api/products?productName=${ProductName}`);
  }

  GetProductByProductCode(ProductCode: string): Observable<Product>
  {
    return this.httpClient.get<Product>(`/api/products?productCode=${ProductCode}`);
  }

  GetProductsByProductType(ProductType: string): Observable<Product[]>
  {
    return this.httpClient.get<Product[]>(`/api/products?productType=${ProductType}`);
  }

  uuidv4()
  {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c)
    {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
