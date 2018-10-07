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

  private url:string = 'http://localhost:8086/recipes/list';

  constructor(private http:HttpClient) { }

  getAllRecipes(){
    this.acounts = new Accounts();
    const headers = new HttpHeaders().set('Authorization', '').set('Content-Type', 'application/json');
    const jsonBack = JSON.stringify(this.acounts);
    return this.http.post<Recipes[]>(this.url,  jsonBack, {headers: headers});
  }

}
