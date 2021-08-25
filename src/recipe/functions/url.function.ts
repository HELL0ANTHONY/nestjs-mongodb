import { ConfigModule } from "@nestjs/config";
ConfigModule.forRoot();

export const baseURL = (id: number): string =>
  `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.API_KEY}&addRecipeInformation=true`;
