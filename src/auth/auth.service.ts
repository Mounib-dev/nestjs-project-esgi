import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "src/users/user.entity";
import { AuthCredentialsDto } from "./dto-type-interface/auth-crendetials.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AccessToken } from "./dto-type-interface/token.type";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepositry: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async login(authCredentialsDto: AuthCredentialsDto): Promise<AccessToken> {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepositry.findOneBy({
      email: email,
    });
    if (!user) {
      throw new UnauthorizedException("Identifiants incorrects");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException("Identifiants incorrects");
    }

    const payload = { sub: user.id, role: user.role };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  // async getProfile() {
  //   const user =
  // }
}
