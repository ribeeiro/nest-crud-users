import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { UserDTO } from 'src/users/user.dto';
import { UserService } from 'src/users/user.service';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get()
  async getUser(@Query('id') id: string) {
    return id ? this.userService.findById(id) : this.userService.findAll();
  }

  @Post()
  async createUser(@Body() user: UserDTO) {
    this.userService.create(user);
  }

  //TODO: ADD PERMISSION TO DELETE AN USER
  @Delete()
  async deleteUserById(@Query('id') id: string) {
    if (!id) {
      return { message: 'You must provide an id' };
    }
    this.userService.delete(id);
  }
}
