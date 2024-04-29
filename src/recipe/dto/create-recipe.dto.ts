import { IsNotEmpty } from 'class-validator';

export class CreateRecipeDTO {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  category: string;

  @IsNotEmpty()
  ingredients: Array<string>;

  @IsNotEmpty()
  instructions: string;
}
