import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Role } from 'src/role/entities/role.entity';
import { IsPasswordRequireChars} from  '../validators/password.validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  login: string;

  @IsNotEmpty()
  @IsPasswordRequireChars()
  password: string;

  @IsNotEmpty()
  name: string;

  // @IsInt({each: true})
  roles: Role[];
}
