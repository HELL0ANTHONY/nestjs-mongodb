// import { Recipe } from "../interfaces/recipe.interface";

const types = (types: any): Array<string> => types.map(type => type);

const steps = (steps: { steps: any }[]): string[][] =>
  steps.map(({ steps }) => steps.map(({ step }: { step: string }) => step));

const mapData = (object: object) => {
  const recipeInfo = Array.isArray(object) ? object : [object];
  console.log(recipeInfo);

  return (
    object &&
    recipeInfo.map((recipe: any) => {
      return {
        id: recipe?.id,
        name: recipe?.title,
        image: recipe?.image,
        summary: recipe?.summary,
        Types: types(recipe?.diets),
        dishTypes: recipe?.dishTypes,
        healthScore: recipe?.healthScore,
        punctuation: recipe?.spoonacularScore,
        steps: steps(recipe?.analyzedInstructions).flat()
      };
    })
  );
};

export default mapData;
