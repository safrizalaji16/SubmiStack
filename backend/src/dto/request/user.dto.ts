import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Role } from "@prisma/client";

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
    type: String,
    default: 'Pass123!',
  })
  password?: string;

  @ApiProperty({
    enum: Role,
    default: Role.user,
  })
  role: Role;
}

export class UserQuery {
  @ApiProperty({
    enum: Role,
    isArray: true,
    default: [Role.user],
  })
  role?: Role[];

  @ApiPropertyOptional({
    type: String,
    default: 'test',
  })
  search?: string;
}

export class UpdateUserDto extends PartialType(UserDto) {
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
  role: Role;
}