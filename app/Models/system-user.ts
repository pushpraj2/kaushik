export class SystemUser
{
  id: number;
  systemUserID: string;
  systemUserName: string;
  systemUserEmail: string;
  password: string;
  creationDateTime: string;
  lastModifiedDateTime: string;

  constructor(ID: number, SystemUserID: string, SystemUserName: string, SystemUserEmail: string, Password: string, CreationDateTime: string, LastModifiedDateTime: string)
  {
    this.id = ID;
    this.systemUserID = SystemUserID;
    this.systemUserName = SystemUserName;
    this.systemUserEmail = SystemUserEmail;
    this.password = Password;
    this.creationDateTime = CreationDateTime;
    this.lastModifiedDateTime = LastModifiedDateTime;
  }
}


