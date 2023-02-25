import { PickType } from '@nestjs/swagger';
import { UserEntity } from '../entities/user.entity';

export class UserLoginDto extends PickType(UserEntity, ['userId', 'password']) {}
