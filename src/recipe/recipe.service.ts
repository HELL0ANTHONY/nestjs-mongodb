import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Recipe } from "./interfaces/recipe.interface";
import { RecipeDTO } from "./dto/recipe.dto";
import { dataFromAPI } from "./functions/getDataFromApi.function";

@Injectable()
export class RecipeService {
  constructor(
    @InjectModel("Recipe") private readonly recipeModel: Model<Recipe>
  ) {}

  async populateDB(
    numberOfRequest: number
  ): Promise<{ message: string; recipes: Recipe[] } | string | undefined> {
    try {
      const count = await this.recipeModel.estimatedDocumentCount();
      if (!count) {
        const recipesFromAPI: Recipe[] = await dataFromAPI(numberOfRequest);
        const recipes = await this.recipeModel.insertMany(recipesFromAPI);
        return { message: "Successfully Populated", recipes };
      }
      return "Database was already populated";
    } catch (error) {
      console.log(error);
    }
  }
}
