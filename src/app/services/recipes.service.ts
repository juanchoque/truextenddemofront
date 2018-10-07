import { Injectable } from '@angular/core';
import { Recipes } from '../model/recipes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable} from 'rxjs';
import { Accounts } from '../model/accounts';


@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  public acounts: Accounts;

  private urlList:string = 'http://localhost:8086/recipes/list';
  private urlAdd:string = 'http://localhost:8086/recipes/add';
  private urlDelete:string = 'http://localhost:8086/recipes/delete';

  constructor(private http:HttpClient) { }

  getAllRecipes(){
    this.acounts = new Accounts();
    const headers = new HttpHeaders().set('Authorization', '').set('Content-Type', 'application/json');
    const jsonBack = JSON.stringify(this.acounts);
    return this.http.post<Recipes[]>(this.urlList,  jsonBack, {headers: headers});
  }

  save(recipes:Recipes){
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', token).set('Content-Type', 'application/json');
    recipes.createDate = null;
    recipes.accounts.createDate = null;
    recipes.accounts.birthDate = null;
    const jsonBack = JSON.stringify(recipes);
    return this.http.post<Recipes>(this.urlAdd,  jsonBack, {headers: headers});
  }

  delete(recipes:Recipes){
    let token = localStorage.getItem("token");
    const headers = new HttpHeaders().set('Authorization', token).set('Content-Type', 'application/json');
    recipes.createDate = null;
    recipes.accounts.createDate = null;
    recipes.accounts.birthDate = null;
    const jsonBack = JSON.stringify(recipes);
    
    return this.http.post<Recipes>(this.urlDelete,  jsonBack, {headers: headers});
  }

}
