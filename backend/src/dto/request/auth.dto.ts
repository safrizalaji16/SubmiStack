import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class RegisterUserDto {
  @ApiProperty({
    type: String,
    default: 'test',
  })
  name: string;

  @ApiProperty({
    type: String,
    default: 'test@mail.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    default: 'Pass123!',
  })
  password: string;

  @ApiProperty({
    enum: Role,
    default: Role.user,
  })
  role: Role;
}

export class LoginUserDto {
  @ApiProperty({
    type: String,
    default: 'test@mail.com',
  })
  email: string;

  @ApiProperty({
    type: String,
    default: 'Pass123!',
  })
  password: string;
}