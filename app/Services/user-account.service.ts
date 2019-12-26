import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../Models/user';

@Injectable({
  providedIn: 'root'
})
export class UserAccountService
{
  currentUser: User;
  isLoggedIn: boolean;
  currentUserType: string;

  constructor(private httpClient: HttpClient)
  {
    this.currentUser = new User(null, null);
    this.isLoggedIn = false;
    this.currentUserType = null;
    
  }


  authenticate(email: string, password: string, usertype: string): Observable<any>
  {
    if (usertype == "Admin") {
      return this.httpClient.get(`/api/admins?password=${password}`);
    }
    else if (usertype == "Supplier") {
      return this.httpClient.get(`/api/suppliers?password=${password}`);
      
    }
    else if (usertype == "SystemUser") {
      return this.httpClient.get(`/api/systemusers?password=${password}`);

    }
    else if (usertype == "Distributor") {
      return this.httpClient.get(`/api/distributors?password=${password}`);

    }
    
    
    

    
    

  }
}



