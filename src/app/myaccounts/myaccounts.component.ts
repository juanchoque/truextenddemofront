import { Component, OnInit } from '@angular/core';
import { Accounts } from '../model/accounts';
import { AccountsService } from '../services/accounts.service';
import {Router} from "@angular/router";
import { error } from 'protractor';

@Component({
  selector: 'app-myaccounts',
  templateUrl: './myaccounts.component.html',
  styleUrls: ['./myaccounts.component.css']
})
export class MyaccountsComponent implements OnInit {

  //attributs for register account
  public accounts:Accounts;
  public disableButtonCAccount:boolean = false;
  public messOperationCAccount:string = '';

  //attributes for register accounts
  public accLogin:Accounts;
  public disableButtonLogin:boolean = false;
  public messOperationLogin:string = '';

  constructor(private _accountsService:AccountsService, private router: Router) { }

  ngOnInit() {
    this.accounts = new Accounts();
    this.disableButtonCAccount = false;
    this.messOperationCAccount = '';

    this.accLogin = new Accounts();
    this.disableButtonLogin = false;
    this.messOperationLogin = '';
  }


  //events
  onSubmit(){
    this.disableButtonCAccount = true;
    this._accountsService.saveOrUpdate(this.accounts)
    .subscribe(
        data => {
            this.disableButtonCAccount = false;
            this.messOperationCAccount = 'Account registrated';
            this.accounts = new Accounts();
        },
        error =>{
          this.disableButtonCAccount = false;
          this.messOperationCAccount = 'Error when registering the account (the account is already registered)';
        }
    );
  }

  onLogin(){
    this.disableButtonLogin = true;
    this.messOperationLogin = '';
    this._accountsService.login(this.accLogin)
    .subscribe(
        data => {
          var correctData = false;
          if(data != undefined){
            if(data.token != ''){
              //save token and id account in local storage
              localStorage.setItem("token", data.token);
              localStorage.setItem("idAccount", data.id + '');
              //end save in local storage

              //redirect
              this.router.navigate(['/recipes']);

              correctData = true;
            }
          }
          if(!correctData){
            this.messOperationLogin = 'User unauthorized or not registred';
          }

          this.disableButtonLogin = false;
          this.accLogin = new Accounts();
        },
        error =>{
          this.disableButtonLogin = false;
          this.messOperationLogin = 'User unauthorized or not registred';
        }
    );
  }

}
