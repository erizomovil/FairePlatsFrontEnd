import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient.models';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private apiUrl = 'http://localhost:8080/ingredients';

  constructor(private http: HttpClient) {}

  getIngredients(): Observable<Ingredient[]> {
    return this.http.get<Ingredient[]>(this.apiUrl);
  }

  getIngredient(id: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.apiUrl}/${id}`);
  }

  addIngredient(ingredient: Ingredient): Observable<Ingredient> {
    return this.http.post<Ingredient>(this.apiUrl, ingredient);
  }

  updateIngredient(id: number, ingredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.apiUrl}/${id}`, ingredient);
  }

  deleteIngredient(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
