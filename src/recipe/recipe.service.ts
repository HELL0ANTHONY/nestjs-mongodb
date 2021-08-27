import { Get, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Recipe } from "./interfaces/recipe.interface";
import { RecipeDTO } from "./dto/recipe.dto";
import { dataFromAPI } from "./functions/getDataFromApi.function";
import { recipeSchema } from "./schema/recipe.schema";

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

  async createRecipe(newRecipe: RecipeDTO): Promise<Recipe> {
    try {
      const recipe = new this.recipeModel(newRecipe);
      return await recipe.save();
    } catch (error) {
      console.log(error);
    }
  }

  async getDetails(id: string): Promise<Recipe | undefined> {
    try {
      return await this.recipeModel.findById(id);
    } catch (error) {
      console.log(error);
    }
  }

  async getTypes(): Promise<Array<string> | undefined> {
    try {
      return await this.recipeModel
        .find()
        .select("types -_id")
        .then((types: Array<{ types: string[] }>) => {
          return types.reduce(
            (acc: string[], el: { types: string[] }) => acc.concat(el.types),
            []
          );
        })
        .then((types: string[]) => [...new Set(types)]);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllRecipes(): Promise<Recipe[] | undefined> {
    try {
      return await this.recipeModel
        .find()
        .select(["_id", "name", "image", "types"]);
    } catch (error) {
      console.log(error);
    }
  }
}
