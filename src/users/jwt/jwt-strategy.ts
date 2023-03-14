import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users.service';
import { JwtPayloadDto } from './jwtPayload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
      ignoreExpiration: true,
    });
  }
  async validate(payload: JwtPayloadDto) {
    // console.log('jwt 전략 validate', payload);
    const user = await this.userService.validate(payload.usersId);

    // console.log('jwt전략validate 유저', user);
    if (!user) {
      throw new UnauthorizedException('invalid token');
    }
    return user;
  }
}
