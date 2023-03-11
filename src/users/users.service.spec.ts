import { Test } from '@nestjs/testing';

import { UserLoginDto } from './dto/login.dto';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt-strategy';

const mockRepoService = {
  findOneBy: jest.fn(),
};
const jwtMock = {
  sign: jest.fn(),
};

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('usersService', () => {
  let usersService: UsersService;
  let userRepository: MockRepository<UserEntity>;
  let jwtService: JwtService;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: 'login_UserEntityRepository',
          useValue: mockRepoService,
        },
        { provide: JwtService, useValue: jwtMock },
      ],
    }).compile();

    usersService = moduleRef.get<UsersService>(UsersService);
    userRepository = moduleRef.get<MockRepository<UserEntity>>('login_UserEntityRepository');
    jwtService = moduleRef.get<JwtService>(JwtService);
  });

  it('login함수', async () => {
    const userLoginDto: UserLoginDto = {
      userId: 'user1',
      password: 'user1',
    };
    const jwtToken = '12e1lkwdjq1oio1';
    jest.spyOn(userRepository, 'findOneBy').mockResolvedValue({ usersId: 1, userId: 'user1' });
    jest.spyOn(jwtService, 'sign').mockReturnValue(jwtToken);
    const result = await usersService.login(userLoginDto);
    console.log(result);
    expect(result).toEqual({ token: `Bearer ${jwtToken}`, userId: 1 });
  });
});
