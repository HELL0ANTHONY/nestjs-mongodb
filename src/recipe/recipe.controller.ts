import { Response } from "express";
import { Controller, Get, HttpStatus, Res, Param } from "@nestjs/common";
import { RecipeService } from "./recipe.service";
import { Recipe } from "./interfaces/recipe.interface";

@Controller("recipe")
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get("/run")
  async runApp(@Res() res: Response): Promise<Response<object> | undefined> {
    try {
      const recipes = await this.recipeService.populateDB(3);
      return res.status(HttpStatus.OK).json({ recipes });
    } catch (error) {
      console.log(error);
    }
  }

  @Get("all")
  async getAllRecipes(
    @Res() res: Response
  ): Promise<Response<Recipe[]> | undefined> {
    try {
      const recipes = await this.recipeService.getAllRecipes();
      return res.status(HttpStatus.OK).json(recipes);
    } catch (error) {
      console.log(error);
    }
  }

  @Get("/types")
  async getTypes(
    @Res() res: Response
  ): Promise<Response<Array<string>> | undefined> {
    try {
      const types = await this.recipeService.getTypes();
      return res.status(HttpStatus.OK).json(types);
    } catch (error) {
      console.log(error);
    }
  }

  @Get("/details/:id")
  async recipeDetail(@Res() res: Response, @Param("id") id: string) {
    try {
      const recipeDetail = await this.recipeService.getDetails(id);
      return res.status(HttpStatus.OK).json(recipeDetail);
    } catch (error) {
      console.log(error);
    }
  }
}
