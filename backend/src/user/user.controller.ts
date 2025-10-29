import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ResponseDto } from 'src/dto/response/response.dto';
import { LoginUserDto, RegisterUserDto } from 'src/dto/request/auth.dto';
import { UserDto } from 'src/dto/request/user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from '@prisma/client';

@ApiTags('user')
@Controller('/api/users')
export class UserController {
  constructor(private userService: UserService) { }

  @Get('/')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Get all users',
    schema: {
      example: {
        message: 'Users fetched successfully',
        data: [
          {
            name: 'test',
            email: 'test@mail.com',
          },
        ],
        errors: null
      }
    }
  })
  async getUsers(@Query() role: Role[]): Promise<ResponseDto<UserDto[]>> {
    const users = await this.userService.getUsers(role);
    return { data: users };
  }
}
