import { IsNotEmpty } from 'class-validator';
import { IsPasswordRequireChars} from  '../validators/password.validator';

export class CreateUserDto {
  @IsNotEmpty()
  login: string;

  @IsNotEmpty()
  @IsPasswordRequireChars()
  password: string;

  @IsNotEmpty()
  name: string;
}
