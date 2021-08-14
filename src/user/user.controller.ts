import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
// ???? ASYNC ????
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':login')
  findOne(@Param('login') login: string) {
    console.log(login);
    return this.userService.findOne(login);
  }

  @Patch(':login')
  async update(@Param('login') login: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(login, updateUserDto);
  }

  @Delete(':login')
  async remove(@Param('login') login: string) {
    return this.userService.remove(login);
  }
}
