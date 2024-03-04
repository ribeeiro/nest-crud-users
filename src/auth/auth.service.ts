import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';
import { LoginDTO } from './dtos/LoginDTO';
import { compareSync } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: LoginDTO) {
    const user = await this.userService.findByEmail(email);
    if (!user) throw new NotFoundException();
    const isValid = compareSync(password, user.password);
    if (isValid) {
      const payload = { userId: user.id, username: user.name };
      return { access_token: await this.jwtService.signAsync(payload) };
    }
    if (!isValid) throw new UnauthorizedException();
  }
}
