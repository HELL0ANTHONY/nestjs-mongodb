import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RecipeModule } from "./recipe/recipe.module";
import { dataFromAPI } from "./recipe/functions/getDataFromApi.function";

dataFromAPI();
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
      {
        useNewUrlParser: true,
        useCreateIndex: true
      }
    ),
    RecipeModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
