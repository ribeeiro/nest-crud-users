import {
  IsUUID,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class UserDTO {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsNotEmpty()
  password: string;
}
