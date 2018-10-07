import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Accounts } from '../model/accounts';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  public accounts;

  private urlList:string = 'http://localhost:8086/accounts/list';
  private urlAdd:string = 'http://localhost:8086/token/createaccount';
  private urlVerify:string = 'http://localhost:8086/token/verify';

  private token:string;

  constructor(private http:HttpClient) { }

  getAllAccounts(){
    //local storage
    this.token = localStorage.getItem("token");

    this.accounts = new Accounts();
    const headers = new HttpHeaders().set('Authorization', this.token).set('Content-Type', 'application/json');
    const jsonBack = JSON.stringify(this.accounts);
    return this.http.post<Accounts[]>(this.urlList,  jsonBack, {headers: headers});
  }

  saveOrUpdate(accounts:Accounts){
    const jsonBack = JSON.stringify(accounts);
    const headers = new HttpHeaders().set('Authorization', '').set('Content-Type', 'application/json');
    return this.http.post<Accounts>(this.urlAdd,  jsonBack, {headers: headers});
  }

  login(accounts:Accounts){
    const jsonBack = JSON.stringify(accounts);
    const headers = new HttpHeaders().set('Authorization', '').set('Content-Type', 'application/json');
    return this.http.post<Accounts>(this.urlVerify,  jsonBack, {headers: headers});
  }

}
