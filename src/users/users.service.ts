import { Injectable, NotFoundException } from '@nestjs/common';
import { UserLoginDto } from './dto/login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { JwtPayloadDto } from './jwt/jwtPayload.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {}
  async login(userLoginDto: UserLoginDto) {
    const existUser: UserEntity = await this.userRepository.findOneBy(userLoginDto);
    console.log('유저서비스 로그인 existUser', existUser);
    if (!existUser) {
      throw new NotFoundException('not found User', '404');
    }
    const { usersId, userId } = existUser;
    const payload: JwtPayloadDto = { usersId, userId };
    console.log('유저서비스 페이로드', payload);
    const token: string = this.jwtService.sign(payload, {
      expiresIn: '1H',
      secret: process.env.JWT_SECRET,
    });
    console.log('유저서비스', token);
    return { token: `Bearer ${token}`, userId: userId };
  }
  async validate(usersId) {
    return await this.userRepository.findOneBy(usersId);
  }
}
