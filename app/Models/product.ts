export class Product
{
  id: number;
  productID: string;
  productCode: string;
  productName: string;
  productType: string;
  productUnitPrice: number;
  creationDateTime: string;
  lastModifiedDateTime: string;

  constructor(ID: number, ProductID: string, ProductCode: string, ProductName: string, ProductType: string, ProductUnitPrice: number, CreationDateTime: string, LastModifiedDateTime: string) {
    this.id = ID;
    this.productID = ProductID;
    this.productCode = ProductCode;
    this.productName = ProductName;
    this.productType = ProductType;
    this.productUnitPrice = ProductUnitPrice;
    this.creationDateTime = CreationDateTime;
    this.lastModifiedDateTime = LastModifiedDateTime;
  }
}
