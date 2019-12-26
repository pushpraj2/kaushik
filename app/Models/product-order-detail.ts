export class ProductOrderDetail {
  id: number;
  productorderDetailID: string;
  productorderID: string;
  productID: string;
  productName: string;
  quantity: number;
  unitPrice: number;
  totalAmount: number;
  creationDateTime: string;
  lastModifiedDateTime: string;

  constructor(ID: number, OrderDetailID: string, OrderID: string, RawMaterialID: string, Quantity: number, UnitPrice: number, TotalAmount: number, CreationDateTime: string, LastModifiedDateTime: string) {
    this.id = ID;
    this.productorderDetailID = OrderDetailID;
    this.productorderID = OrderID;
    this.productID = RawMaterialID;
    this.quantity = Quantity;
    this.unitPrice = UnitPrice;
    this.totalAmount = TotalAmount;
    this.creationDateTime = CreationDateTime;
    this.lastModifiedDateTime = LastModifiedDateTime;
  }
}
