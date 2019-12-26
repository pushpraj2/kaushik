export class DistributorAddress {
  id: number;
  distributorID: string;
  distributorAddressID: string;

  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: number;

  creationDateTime: string;
  lastModifiedDateTime: string;

  constructor(ID: number,

    DistributorAddressID: string,
    AddressLine1: string,
    AddressLine2: string,
    City: string,
    State: string,
    Pincode: number,
    CreationDateTime: string,
    LastModifiedDateTime: string) {
    this.id = ID;

    this.distributorAddressID = DistributorAddressID;
    this.addressLine1 = AddressLine1;
    this.addressLine2 = AddressLine2;
    this.city = City;
    this.state = State;
    this.pincode = Pincode;
    this.creationDateTime = CreationDateTime;
    this.lastModifiedDateTime = LastModifiedDateTime;
  }
}
