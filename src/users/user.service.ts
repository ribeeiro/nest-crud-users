import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './createUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: CreateUserDTO) {
    this.userRepository.save(this.userRepository.create(user));
  }

  async findAll() {
    const users = this.userRepository.find();
    return users;
  }

  async delete(id: string) {
    this.userRepository.delete(id);
  }

  async findById(id: string) {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw new NotFoundException();
    return user;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = await this.userRepository.findOne({ where: { email } });
    return user;
  }

  async updatePassword(id: string, email: string) {
    this.userRepository.update({ id }, { email });
  }
}
