import { Res } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { UserLoginDto } from './dto/login.dto';
import { UserEntity } from './entities/user.entity';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Response } from 'express';
const mockService = {
  login: jest.fn(),
};

describe('usersController', () => {
  let usersService: UsersService;
  let usersController: UsersController;
  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockService }],
    }).compile();

    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
  });
  it('login함수', async () => {
    const data: UserLoginDto = {
      userId: 'user1',
      password: 'user1',
    };
    const userLoginDto: UserLoginDto = { userId: 'test', password: 'password' };
    jest.spyOn(usersService, 'login').mockResolvedValue({ token: 'asdfaegsdfse123', userId: 1 });
    const res: Response = { setHeader: jest.fn(), send: jest.fn() } as any;
    await usersController.login(userLoginDto, res);
    expect(res.setHeader).toHaveBeenCalledWith('Authorization', 'asdfaegsdfse123');
  });
});
