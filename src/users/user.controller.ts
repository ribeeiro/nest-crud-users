import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserDTO } from 'src/users/user.dto';
import { UserService } from 'src/users/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getUser() {
    const users = this.userService.findAll();
    return users;
  }

  @Post()
  async createUser(@Body() user: UserDTO) {
    this.userService.create(user);
  }

  @Get(':id')
  async getIdByUser(@Param('id') id: number) {
    const user = this.userService.findById(id);
    return user ? user : 'User not found';
  }
}
