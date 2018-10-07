import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesComponent } from './recipes/recipes.component';
import { AccountsComponent } from './accounts/accounts.component';
import { MyaccountsComponent } from './myaccounts/myaccounts.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {path:'', component:RecipesComponent},
  {path:'recipes', component:RecipesComponent},
  {path:'accounts', component:AccountsComponent},
  {path:'myaccounts', component:MyaccountsComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
                      RecipesComponent, 
                      AccountsComponent,
                      MyaccountsComponent,
                    NotFoundComponent]
