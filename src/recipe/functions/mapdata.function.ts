import { Recipe } from "../interfaces/recipe.interface";

const steps = (steps: { steps: Array<object> }[]): string[][] =>
  steps.map(({ steps }) => steps.map(({ step }: { step: string }) => step));

const mapData = (object: object): Array<Recipe> => {
  const recipeInfo = Array.isArray(object) ? object : [object];
  return (object &&
    recipeInfo.map((recipe: any) => {
      return {
        name: recipe?.title,
        image: recipe?.image,
        summary: recipe?.summary,
        healthScore: recipe?.healthScore,
        punctuation: recipe?.spoonacularScore,
        types: recipe?.diets,
        dishTypes: recipe?.dishTypes,
        steps: steps(recipe?.analyzedInstructions).flat()
      };
    })) as Recipe[];
};

export default mapData;
