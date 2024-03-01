import { Injectable } from '@nestjs/common';
import { UserDTO } from 'src/users/user.dto';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}
  async create(user: UserDTO) {
    this.userRepository.save(this.userRepository.create(user));
  }

  async findAll() {
    const users = this.userRepository.find();
    return users;
  }

  async findById(id: number) {
    const user = this.userRepository.findOne({ where: { id } });
    return user ? user : 'Nenhum user com esse id';
  }
}
