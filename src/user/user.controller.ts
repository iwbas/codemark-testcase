import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { BadRequestExceptionFilter } from './validators/bad-request.exception-filter';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseFilters(new BadRequestExceptionFilter())
  async create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService
      .create(createUserDto)
      .then((result) => ({ success: true }))
      .catch((err) => ({success: false, errors: err}));
  }

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':login')
  async findOne(@Param('login') login: string) {
    return this.userService.findOne(login);
  }

  @Patch(':login')
  async update(
    @Param('login') login: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(login, updateUserDto);
  }

  @Delete(':login')
  async remove(@Param('login') login: string) {
    return this.userService.remove(login);
  }
}
