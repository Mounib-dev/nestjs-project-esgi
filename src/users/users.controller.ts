import { Controller, Get, Param, Post, Body, HttpCode } from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegisterUserDto } from "./dto-interfaces-types/register-user.dto";
import { User } from "./user.entity";

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get("/list")
  getAll() {
    return this.usersService.findAll();
  }

  @Get("/:id")
  getOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Post("register")
  @HttpCode(201)
  async register(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    await this.usersService.register(registerUserDto);
  }
}
