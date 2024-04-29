import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDTO } from './dto/create-recipe.dto';
import { GetRecipesFilterDTO } from './dto/get-recipes-filter.dto';

@Controller('recipe')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Post('/create')
  @UsePipes(ValidationPipe)
  async addRecipe(@Body() createRecipeDTO: CreateRecipeDTO) {
    const recipe = await this.recipeService.addRecipe(createRecipeDTO);
    return recipe;
  }

  @Get('/recipes')
  async getRecipes(@Query(ValidationPipe) filterDTO: GetRecipesFilterDTO) {
    if (Object.keys(filterDTO).length) {
      const filteredRecipes =
        await this.recipeService.getFilteredRecipes(filterDTO);
      return filteredRecipes;
    } else {
      const allRecipes = await this.recipeService.getAllRecipes();
      return allRecipes;
    }

    const allRecipes = await this.recipeService.getAllRecipes();
    return allRecipes;
  }

  @Get('/:recipeID')
  async getRecipe(@Param('recipeID') recipeID) {
    const recipe = await this.recipeService.getRecipe(recipeID);
    if (!recipe) throw new NotFoundException('Recipe does not exist!');
    return recipe;
  }

  @Put('/update/:recipeID') async updateRecipe(
    @Param('recipeID') recipeID,
    @Body() createRecipeDTO: CreateRecipeDTO,
  ) {
    const recipe = await this.recipeService.updateRecipe(
      recipeID,
      createRecipeDTO,
    );
    if (!recipe) throw new NotFoundException('Recipe does not exist!');
    return recipe;
  }

  @Delete('/delete/:recipeID')
  async deleteRecipe(@Param('recipeID') recipeID) {
    const recipe = await this.recipeService.deleteRecipe(recipeID);
    if (!recipe) throw new NotFoundException('Recipe does not exist');
    return recipe;
  }
}
