import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  private users: Array<User> = []

  create(createUserDto: CreateUserDto) {
    this.users.push(createUserDto);
    return createUserDto;
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users[id]
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    // return this.users[id] = updateUserDto;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
