import { Supplier } from './supplier';

export class SupplierAddress {
  id: number;
  supplierAddressID: string;
  addressLine1: string;
  addressLine2: string;
  pinCode: string;
  city: string;
  state: string;
  creationDateTime: string;
  lastModifiedDateTime: string;

  

  constructor(ID: number,
    SupplierAddressID: string,
    AddressLine1: string,
    AddressLine2: string,
    PinCode: string,
    City: string,
    State: string,
    CreationDateTime: string,
    LastModifiedDateTime: string
)
  {
    this.id = ID;
    this.supplierAddressID = SupplierAddressID;
    this.addressLine1 = AddressLine1;
    this.addressLine2 = AddressLine2;
    this.pinCode = PinCode;
    this.city = City;
    this.state = State;
    this.creationDateTime= CreationDateTime;
    this.lastModifiedDateTime= LastModifiedDateTime

  }
}


