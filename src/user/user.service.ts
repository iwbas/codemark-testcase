import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  private users: Array<User> = [];

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(login: string) {
    return await this.userRepository.find({
      where: {
        login: login,
      },
    });
  }

  async update(login: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(login, updateUserDto);
  }

  async remove(login: string) {
    return await this.userRepository.delete(login);
  }
}
