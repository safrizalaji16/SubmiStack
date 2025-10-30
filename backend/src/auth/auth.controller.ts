import { Body, Controller, Get, HttpCode, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginUserDto, RegisterUserDto } from 'src/dto/request/auth.dto';
import { ResponseDto } from 'src/dto/response/response.dto';
import { LoginRes, UserDto } from 'src/dto/response/user.dto';
import { Response, Request } from 'express';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('/register')
    @HttpCode(201)
    @ApiOperation({ summary: 'Register a new user' })
    @ApiBody({ type: RegisterUserDto })
    @ApiResponse({
        status: 201,
        description: 'The user has been registered successfully.',
        schema: {
            example: {
                message: 'User registered successfully',
                data: {
                    id: '00000000-0000-0000-0000-000000000000',
                    name: 'test',
                    email: 'test@mail.com',
                    role: 'user',
                },
                errors: null,
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request',
        schema: {
            example: {
                message: 'Invalid data',
                data: null,
                errors: 'Email already in use',
            },
        },
    })
    async register(
        @Body() registerUserDto: RegisterUserDto
    ): Promise<ResponseDto<UserDto>> {
        const user = await this.authService.register(registerUserDto);

        return {
            message: 'User registered successfully',
            data: user,
            errors: null
        }
    }

    @Post('/login')
    @HttpCode(200)
    @ApiOperation({ summary: 'Login a user' })
    @ApiBody({ type: LoginUserDto })
    @ApiResponse({
        status: 200,
        description: 'User logged in successfully',
        schema: {
            example: {
                message: 'User logged in successfully',
                data: {
                    id: '00000000-0000-0000-0000-000000000000',
                    name: 'test',
                    email: 'test@mail.com',
                    role: 'user',
                },
                errors: null,
            },
        },
    })
    @ApiResponse({
        status: 400,
        description: 'Bad request',
        schema: {
            example: {
                message: 'Invalid data',
                data: null,
                errors: 'Invalid credentials',
            },
        },
    })
    async login(
        @Res({ passthrough: true }) res: Response,
        @Body() loginUserDto: LoginUserDto
    ): Promise<ResponseDto<LoginRes>> {
        const user = await this.authService.login(loginUserDto);

        res.cookie('JWT', user.token);

        return {
            message: 'User logged in successfully',
            data: user,
            errors: null
        }
    }

    @Get('/me')
    @HttpCode(200)
    @ApiOperation({ summary: 'Get the current user' })
    @ApiResponse({
        status: 200,
        description: 'User retrieved successfully',
        schema: {
            example: {
                message: 'User retrieved successfully',
                data: {
                    id: '00000000-0000-0000-0000-000000000000',
                    name: 'test',
                    email: 'test@mail.com',
                    role: 'user',
                },
                errors: null,
            },
        },
    })
    async me(
        @Req() req: Request,
    ): Promise<ResponseDto<UserDto>> {
        const id = req.user.id

        return {
            message: 'User retrieved successfully',
            data: await this.authService.me(id),
            errors: null
        }
    }
}
