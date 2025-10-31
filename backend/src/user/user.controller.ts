import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ResponseDto } from 'src/dto/response/response.dto';
import { UpdateUserDto, UserDto, UserQuery } from 'src/dto/request/user.dto';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('User')
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
            id: '00000000-0000-0000-0000-000000000000',
            name: 'test',
            email: 'test@mail.com',
            role: 'user',
          },
        ],
        errors: null
      }
    }
  })
  async getUsers(@Query() query: UserQuery): Promise<ResponseDto<UserDto[]>> {
    const users = await this.userService.getUsers(query);
    return {
      message: 'Users fetched successfully',
      data: users,
      errors: null
    };
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({
    status: 200,
    description: 'Get user by id',
    schema: {
      example: {
        message: 'User fetched successfully',
        data: {
          id: '00000000-0000-0000-0000-000000000000',
          name: 'test',
          email: 'test@mail.com',
          role: 'user',
        },
        errors: null
      }
    }
  })
  async getUser(@Param('id') id: string): Promise<ResponseDto<UserDto>> {
    const user = await this.userService.getUser(id);
    return {
      message: 'User fetched successfully',
      data: user,
      errors: null
    };
  }

  @Post('/')
  @HttpCode(201)
  @ApiOperation({ summary: 'Register user by Admin' })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    schema: {
      example: {
        message: 'User registered successfully',
        data: {
          id: '00000000-0000-0000-0000-000000000000',
          name: 'test',
          email: 'test@mail.com',
          role: 'user',
        },
        errors: null
      }
    }
  })
  async register(@Body() user: UserDto): Promise<ResponseDto<UserDto>> {
    const registeredUser = await this.userService.createUser(user);
    return {
      message: 'User registered successfully',
      data: registeredUser,
      errors: null
    };
  }

  @Put('/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully',
    schema: {
      example: {
        message: 'User updated successfully',
        data: {
          name: 'test',
          email: 'test@mail.com',
          role: 'user',
        },
        errors: null
      }
    }
  })
  async update(@Param('id') id: string, @Body() user: UpdateUserDto): Promise<ResponseDto<UserDto>> {
    const updatedUser = await this.userService.updateUser(id, user);
    return {
      message: 'User updated successfully',
      data: updatedUser,
      errors: null
    };
  }

  @Delete('/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully',
    schema: {
      example: {
        message: 'User deleted successfully',
        data: {
          id: '00000000-0000-0000-0000-000000000000',
          name: 'test',
          email: 'test@mail.com',
          role: 'user',
        },
        errors: null
      }
    }
  })
  async delete(@Param('id') id: string): Promise<ResponseDto<UserDto>> {
    const deletedUser = await this.userService.deleteUser(id);
    return {
      message: 'User deleted successfully',
      data: deletedUser,
      errors: null
    };
  }
}
