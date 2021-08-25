import { Module } from "@nestjs/common";
import { RecipeController } from "./recipe.controller";
import { RecipeService } from "./recipe.service";
import { MongooseModule } from "@nestjs/mongoose";
import { recipeSchema } from "./schema/recipe.schema";

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "Recipe", schema: recipeSchema }])
  ],
  controllers: [RecipeController],
  providers: [RecipeService]
})
export class RecipeModule {}
