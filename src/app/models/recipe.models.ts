export interface Recipe {
  id?: number;
  title: string;
  difficulty: number;
  time: number;
  image: string | null;
  ingredients: number[];
}
