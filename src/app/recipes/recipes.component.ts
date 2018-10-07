import { Component, OnInit } from '@angular/core';
import { Recipes } from '../model/recipes';
import { RecipesService } from '../services/recipes.service';
import { Accounts } from '../model/accounts';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  public recipes = [];
  public recipesSearch = [];
  public idAccount:string;

  //object for search or edit
  public recipe:Recipes;

  //property for search
  public recipesTextSearch:Recipes;

  constructor(private _repesService:RecipesService) { }

  ngOnInit() {
    this.recipe = new Recipes();
    this.idAccount = localStorage.getItem("idAccount");
    this.recipesTextSearch = new Recipes();

    this.loadAll();
  }

  loadAll(){
    this._repesService.getAllRecipes()
                  .subscribe(data => this.recipes = data);
  }

  //events
  //create new recipe
  onCreate(){
      this.recipe = new Recipes();
  }

  //add ingredients
  onMoreIngredients(){

  }

  //remove ingredients
  onDeleteIngredients(){

  }

  //save recipe
  onSave(){

  }

  //search all recipes
  onAllRecipes(){
    this.loadAll();
  }

  //search only may recipes
  onMyRecipes(){
    this.recipesSearch = [];
    this.recipes.forEach(element => {
      if(element.accounts.id == this.idAccount){
        this.recipesSearch.push(element);
      }
    });
    this.recipes = this.recipesSearch;
  }

  //seach by description or name
  onSearch(){
    this.recipesSearch = [];
    if(this.recipesTextSearch.name != undefined){
      if(this.recipesTextSearch.name != ''){
        this.recipes.forEach(element => {
          if(this.recipesTextSearch.name.toUpperCase().indexOf(element.name.toUpperCase()) >= 0 
                  || this.recipesTextSearch.name.toUpperCase().indexOf(element.preparation.toUpperCase()) >= 0){
            this.recipesSearch.push(element);
          }
        });
        this.recipes = this.recipesSearch;
      }
      else{
        this.loadAll();
      }
    }
    else{
      this.loadAll();
    }
  }

  //delete recipe
  onDelete(recipes:Recipes){

  }

  //edit recipe
  onEdit(recipes:Recipes){

  }

  //info recipes
  onInfo(recipes:Recipes){

  }

}
