import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SystemUser } from '../Models/system-user';

@Injectable({
  providedIn: 'root'
})
export class SystemUsersService
{
  constructor(private httpClient: HttpClient)
  {
  }

  AddSystemUser(systemuser: SystemUser): Observable<boolean>
  {
    systemuser.creationDateTime = new Date().toLocaleDateString();
    systemuser.lastModifiedDateTime = new Date().toLocaleDateString();
    systemuser.systemUserID = this.uuidv4();
    return this.httpClient.post<boolean>(`/api/systemusers`, systemuser);
  }

  UpdateSystemUser(systemuser: SystemUser): Observable<boolean>
  {
    systemuser.lastModifiedDateTime = new Date().toLocaleDateString();
    return this.httpClient.put<boolean>(`/api/systemusers`, systemuser);
  }

  DeleteSystemUser(SystemUserID: string, ID: number): Observable<boolean>
  {
    return this.httpClient.delete<boolean>(`/api/systemusers/${ID}`);
  }

  GetAllSystemUsers(): Observable<SystemUser[]>
  {
    return this.httpClient.get<SystemUser[]>(`/api/systemusers`);
  }

  uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c)
    {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}



