import { Component, OnInit } from '@angular/core';
import { Recipes } from '../model/recipes';
import { RecipesService } from '../services/recipes.service';
import { Accounts } from '../model/accounts';
import { Ingredients } from '../model/ingredients';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  public recipes = [];
  public recipesSearch = [];
  public idAccount:string;

  //property for show inform save or update
  public messOperationSave:string;
  public disableButtonSave:boolean = false;

  //object for search or edit
  public recipe:Recipes;

  //property for search
  public recipesTextSearch:Recipes;

  //properties for hide and show dom html
  public inVisibleFormAdd:boolean = true;
  public inVisibleList:boolean = false;

  constructor(private _repesService:RecipesService) { }

  ngOnInit() {
    this.recipe = new Recipes();
    this.idAccount = localStorage.getItem("idAccount");
    this.recipesTextSearch = new Recipes();

    this.messOperationSave = '';
    this.disableButtonSave = false;

    this.inVisibleFormAdd = true;
    this.inVisibleList = false;

    this.loadAll();
  }

  loadAll(){
    this._repesService.getAllRecipes()
                  .subscribe(data => this.recipes = data);
  }

  //events
  //create new recipe
  onCreate(){
    this.inVisibleFormAdd = false;
    this.inVisibleList = true;

    this.recipe = new Recipes();
  }

  //add ingredients
  onMoreIngredients(){
    if(this.recipe != null){
       let ingredients = new Ingredients();
       //counter intify to remove
       ingredients.counter = this.recipe.listIngredients.length + 1;

       this.recipe.listIngredients.push(ingredients);
    }
  }

  //remove ingredients
  onDeleteIngredients(ingredients:Ingredients){
    if(this.recipe != null){
      this.recipe.listIngredients = this.recipe.listIngredients.filter(obj => obj.counter !== ingredients.counter);
    }
  }

  //cancel
  onCancel(){
    this.disableButtonSave = false;
    this.messOperationSave = '';
    this.recipe = new Recipes();

    this.inVisibleFormAdd = true;
    this.inVisibleList = false;
  }

  //save recipe
  onSave(){
    if(this.recipe != null){
      if(this.recipe.name != '' && this.recipe.preparation != ''){
        this.messOperationSave = '';
        this.disableButtonSave = true;
        this._repesService.save(this.recipe)
                .subscribe(
                  data => {
                    this.disableButtonSave = false;
                    this.messOperationSave = 'Recipe registrated';
                    this.recipe = new Recipes();

                    this.inVisibleFormAdd = true;
                    this.inVisibleList = false;

                    this.loadAll();
                  },
                  error =>{
                    this.disableButtonSave = false;
                    this.messOperationSave = 'Error when registering the recipe';
                  }
                );
      }
      else{
        this.disableButtonSave = false;
        this.messOperationSave = 'Error when registering the recipe';
      }
    }
    else{
      this.disableButtonSave = false;
       this.messOperationSave = 'Error when registering the recipe';
    }
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
    this._repesService.delete(recipes).subscribe(
      data => {
        this.loadAll();
      },
      error =>{
      }
    );
  }

  //edit recipe
  onEdit(recipes:Recipes){
    this.inVisibleFormAdd = false;
    this.inVisibleList = true;

    this.recipe = recipes;
  }

}
