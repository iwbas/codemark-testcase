import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '../role/entities/role.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Role) private roleRepository: Repository<Role>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    var user = await this.userRepository.findOne(createUserDto.login);

    if (user) throw {error: "User already exists"};

    if (createUserDto.roles) {
      createUserDto.roles = await this.roleRepository.findByIds(createUserDto.roles);
    }

    return this.userRepository.save(createUserDto);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(login: string) {
    return await this.userRepository.findOne(login, { relations: ["roles"]});
  }

  async update(login: string, updateUserDto: UpdateUserDto) {

    var roles = updateUserDto.roles ? await this.roleRepository.findByIds(updateUserDto.roles) : null;

    updateUserDto.roles = roles;

    return await this.userRepository.save(updateUserDto);
  }

  async remove(login: string) {
    return await this.userRepository.delete(login);
  }
}
