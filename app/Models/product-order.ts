export class ProductOrder {
  id: number;
  productorderID: string;
  productorderDate: string;
  distributorID: string;
  totalQuantity: number;
  totalAmount: number;
  creationDateTime: string;
  lastModifiedDateTime: string;

  constructor(ID: number, OrderID: string, OrderDate: string, SupperID: string, TotalQuantity: number, TotalAmount: number, CreationDateTime: string, LastModifiedDateTime: string) {
    this.id = ID;
    this.productorderID = OrderID;
    this.productorderDate = OrderDate;
    this.distributorID = SupperID;
    this.totalQuantity = TotalQuantity;
    this.totalAmount = TotalAmount;
    this.creationDateTime = CreationDateTime;
    this.lastModifiedDateTime = LastModifiedDateTime;
  }
}
