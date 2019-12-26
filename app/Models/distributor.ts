export class Distributor {
  id: number;
  distributorID: string;

  distributorName: string;
  distributorMobile: string;
  email: string;
  password: string;
  creationDateTime: string;
  lastModifiedDateTime: string;

  constructor(ID: number, DistributorID: string, DistributorName: string, DistributorMobile: string, Email: string, Password: string, CreationDateTime: string, LastModifiedDateTime: string) {
    this.id = ID;
    this.distributorID = DistributorID;
    this.distributorName = DistributorName;
    this.distributorMobile = DistributorMobile;
    this.email = Email;
    this.password = Password;
    this.creationDateTime = CreationDateTime;
    this.lastModifiedDateTime = LastModifiedDateTime;
  }
}
