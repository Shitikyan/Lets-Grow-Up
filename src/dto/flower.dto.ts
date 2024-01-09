import { IsString, IsNotEmpty, IsArray, IsNumber } from 'class-validator';

export class CreateFlowerDto {
  @IsString()
  @IsNotEmpty()
  qrCode: string;

  @IsString()
  @IsNotEmpty()
  familyName: string;

  @IsNumber()
  age: number;

  @IsString()
  @IsNotEmpty()
  history: string;

  @IsArray()
  comments: string[];
}
