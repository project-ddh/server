import { Controller, Post, Body, UseGuards, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UserLoginDto } from './dto/login.dto';
import { Response } from 'express';

@ApiTags('User-Session')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('login')
  @UseGuards()
  async login(@Body() userLoginDto: UserLoginDto, @Res() res: Response) {
    // console.log('유저컨트롤 body', userLoginDto);
    const { token, userId } = await this.usersService.login(userLoginDto);
    console.log('유저컨트롤 token', token);
    /**
     * @token payload = usersId[PK:number] / userId[string]
     */
    res.setHeader('Authorization', token);
    res.send({ usersId: userId });
  }
}
