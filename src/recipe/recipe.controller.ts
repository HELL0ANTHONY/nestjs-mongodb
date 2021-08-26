import { Response } from "express";
import { Controller, Get, HttpStatus, Res } from "@nestjs/common";
import { RecipeService } from "./recipe.service";

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

  @Get()
  getRecipes(@Res() res: Response<object>): Response<object> {
    return res.status(HttpStatus.OK).json({ message: "Everything Ok" });
  }
}
