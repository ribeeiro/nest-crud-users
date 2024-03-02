import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn({ email, password }: Record<'email' | 'password', string>) {
    const user = await this.userService.findByEmail(email);
    if (!user) return { message: 'Nenhum usuario com esse email' };
    if (user.password !== password) return 'Não Logado';
    const payload = { userId: user.id, username: user.name };
    return { access_token: await this.jwtService.signAsync(payload) };
  }
}
