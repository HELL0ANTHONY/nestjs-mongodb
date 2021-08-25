import { Response } from "express";
import { Controller, Get, HttpStatus, Res } from "@nestjs/common";

@Controller("recipe")
export class RecipeController {
  @Get()
  getRecipes(@Res() res: Response<object>): Response<object> {
    return res.status(HttpStatus.OK).json({ message: "Everything Ok" });
  }
}
