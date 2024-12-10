export interface Relation {
  recipe: {
    id: number;
  };
  ingredient: {
    id: number;
  };
  quantity: string | undefined;
}
