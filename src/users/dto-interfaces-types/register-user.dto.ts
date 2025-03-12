import { IsEmail, IsNotEmpty, MinLength } from "class-validator";
import { UserRole } from "./user-role.type";

export class RegisterUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  role?: UserRole;
}
