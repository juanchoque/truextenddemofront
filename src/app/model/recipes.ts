import { Accounts } from "./accounts";
import { Ingredients } from "./ingredients";

export class Recipes {
    public id:number;
    public createDate:string;
    public name:string;
    public preparation:string;
    public state:number;
    public accounts:Accounts;
    public listIngredients:Ingredients[] = [];
}