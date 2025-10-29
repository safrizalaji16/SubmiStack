import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';

export class UserDto {
  @ApiProperty({
    type: String,
    default: '00000000-0000-0000-0000-000000000000',
  })
  id: string;

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
    enum: Role,
    default: Role.user,
  })
  role?: Role;

  @ApiProperty({
    type: Date,
    default: new Date('01-01-1999'),
  })
  createdAt?: Date;

  @ApiProperty({
    type: String,
    default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJle...',
  })
  token?: string;
}

export class LoginRes {
  @ApiProperty({
    type: String,
    default: '00000000-0000-0000-0000-000000000000',
  })
  id: string;

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
    enum: Role,
    default: Role.user,
  })
  role: string;

  @ApiProperty({
    type: Date,
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
  })
  updatedAt: Date;

  @ApiProperty({
    type: String,
    default: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJle...',
  })
  token?: string;
}
