import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'recipesFRouting';

  constructor(private router: Router) { }

  outLogin(){
    localStorage.setItem("token", '');
    localStorage.setItem("idAccount", '');

    this.router.navigate(['/recipes']);
  }
}

