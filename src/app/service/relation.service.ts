import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Relation } from '../models/relation.models';

@Injectable({
  providedIn: 'root',
})
export class IngredientsRecipesService {
  private apiUrl = 'http://localhost:8080/ingredientsRecipes';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  createIngredientRecipe(relation: Relation): Observable<Relation> {
    return this.http.post<Relation>(this.apiUrl, relation, this.httpOptions);
  }

  createRelations(relations: Relation[]): Observable<Relation[]> {
    return this.http.post<Relation[]>(
      `${this.apiUrl}/bulk`,
      relations,
      this.httpOptions
    );
  }

  getAllIngredientsRecipes(): Observable<Relation[]> {
    return this.http.get<Relation[]>(this.apiUrl);
  }

  getIngredientRecipe(
    idRecipe: number,
    idIngredient: number
  ): Observable<Relation> {
    const url = `${this.apiUrl}/${idRecipe}/${idIngredient}`;
    return this.http.get<Relation>(url);
  }

  deleteIngredientRecipe(
    idRecipe: number,
    idIngredient: number
  ): Observable<void> {
    const url = `${this.apiUrl}/${idRecipe}/${idIngredient}`;
    return this.http.delete<void>(url);
  }
}
