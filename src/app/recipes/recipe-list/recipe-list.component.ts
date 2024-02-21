import { Component } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.css'
})
export class RecipeListComponent {
  recipes: Recipe[] = [
    new Recipe('A Test Recipe', 'This is simply a test', 'https://i.pinimg.com/originals/70/09/19/7009193184270fbdef1d81ee0a55a3ba.jpg'),
    new Recipe('A Test Recipe', 'This is simply a test', 'https://i.pinimg.com/originals/70/09/19/7009193184270fbdef1d81ee0a55a3ba.jpg'),
  ];


}
