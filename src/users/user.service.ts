import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from './dtos/createUser.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(user: CreateUserDTO) {
    const userAlreadyExists = await this.findByEmail(user.email);
    console.log(userAlreadyExists, user);
    if (userAlreadyExists) throw new NotFoundException();
    const saltRounds = 10;
    const hash = bcrypt.hashSync(String(user.password), saltRounds);
    user.password = hash;
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
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
