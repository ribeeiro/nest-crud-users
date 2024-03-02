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

  async delete(id: string) {
    this.userRepository.delete(id);
  }

  async findById(id: string) {
    const user = this.userRepository.findOne({ where: { id } });
    return user ? user : 'Nenhum user com esse id';
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const user = this.userRepository.findOne({ where: { email } });
    return user;
  }

  async updateEmail(id: string, email: string) {
    this.userRepository.update({ id }, { email });
  }
}
