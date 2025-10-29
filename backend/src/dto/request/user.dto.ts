import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Role } from "@prisma/client";

export class UserDto {
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
    isArray: true,
    default: Role.user,
  })
  role: Role;
}
