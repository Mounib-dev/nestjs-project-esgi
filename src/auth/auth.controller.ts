import { Body, Controller, HttpCode, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto-type-interface/auth-crendetials.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("login")
  @HttpCode(201)
  async login(@Body() authredentialsDto: AuthCredentialsDto) {
    return this.authService.login(authredentialsDto);
  }
}
