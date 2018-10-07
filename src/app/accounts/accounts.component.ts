import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../services/accounts.service';
import { Accounts } from '../model/accounts';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  public accounts = [];
  public accountsSearch = [];
  public accountTextSearch:Accounts;

  constructor(private _accountsService:AccountsService) { }

  ngOnInit() {
    this.accountTextSearch = new Accounts();
    this.loadAll();
  }

  //method for load all
  loadAll(){
    this._accountsService.getAllAccounts()
                  .subscribe(data => this.accounts = data);
  }

  //events
  //method for seach data accounts bay first name, last name or email
  onSearch(){
    this.accountsSearch = [];
    if(this.accountTextSearch.firstName != undefined){
      if(this.accountTextSearch.firstName != ''){
        this.accounts.forEach(element => {
          if(this.accountTextSearch.firstName.toUpperCase().indexOf(element.firstName.toUpperCase()) >= 0 
              || this.accountTextSearch.firstName.toUpperCase().indexOf(element.lastName.toUpperCase()) >= 0  
              || this.accountTextSearch.firstName.toUpperCase().indexOf(element.email.toUpperCase()) >= 0){

            this.accountsSearch.push(element);

          }
        });
        this.accounts = this.accountsSearch;
      }
      else{
        this.loadAll();
      }
    }
    else{
      this.loadAll();
    }
  }

}
