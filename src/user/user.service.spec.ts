import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Role } from '../role/entities/role.entity';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const roleArray: Role[] = [
  new Role(1, 'admin', null),
  new Role(2, 'moderator', null),
];

const userArray: User[] = [
  new User('login', 'password', 'name', [roleArray[0]]),
  new User('iwbas', 'S1', 'Ivan', [roleArray[1]]),
];

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            find: jest.fn().mockResolvedValue(userArray),
            findOne: jest.fn((createUserDto: CreateUserDto) => {
              return new Promise((resolve, reject) => {
                resolve(
                  userArray.find((item) => item.login == createUserDto.login)
                );
              });
            }),
            save: jest.fn((createUserDto: CreateUserDto) => {
              return new Promise((resolve, reject) => {
                var index = userArray.findIndex((value) => value.login === createUserDto.login);
                if (index === -1) {
                  resolve(userArray.push(createUserDto));
                }

                resolve(userArray[index] = createUserDto);
              });
            }),
            update: jest.fn().mockResolvedValue(true),
            delete: jest.fn().mockResolvedValue(true),
          },
        },
        { provide: getRepositoryToken(Role), useValue: {
          findByIds: jest.fn((roles: number[]) => {
            return new Promise((resolve, reject) => {
              if (!roles) reject(null);
              resolve(
                roleArray.find((role) => roles.includes(role.id)),
              );
            });
          }),
        } },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('calling create method', async () => {
    const dto = new CreateUserDto();
    dto.login = 'notexist';
    dto.name = 'Ivan';
    dto.password = 'K1';
    expect(await service.create(dto)).toBe(3);
  });

  it('calling update method', async () => {
    const dto = new UpdateUserDto();
    dto.login = 'notexist';
    dto.name = 'Egor';
    dto.password = 'NewPassword1';
    expect(await service.update(dto.login, dto)).toBe(dto);
  });

  it('calling update method', async () => {
    expect(await service.remove("iwbas")).toBe(true);
  });
});
