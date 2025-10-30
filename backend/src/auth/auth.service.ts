import { HttpException, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Role } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { LoginUserDto, RegisterUserDto } from 'src/dto/request/auth.dto';
import { LoginRes, UserDto } from 'src/dto/response/user.dto';
import { comparePassword, hashPassword } from 'src/helpers/bcrypt';
import { generateToken } from 'src/helpers/jwt';
import { Logger } from 'winston';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        private configService: ConfigService,
    ) { }

    async register(registerUserDto: RegisterUserDto): Promise<UserDto> {
        this.logger.debug(`Register new user ${JSON.stringify(registerUserDto)}`);

        const existingUser = await this.prismaService.user.findUnique({
            where: { email: registerUserDto.email },
        });

        if (existingUser) {
            throw new HttpException('email or name already exists', 400);
        }

        const createdUser = await this.prismaService.user.create({
            data: {
                name: registerUserDto.name,
                email: registerUserDto.email,
                role: Role[registerUserDto.role],
                password: await hashPassword(registerUserDto.password),
            },
        })

        return {
            id: createdUser.id,
            name: createdUser.name,
            email: createdUser.email,
        };
    }

    async login(loginUserDto: LoginUserDto): Promise<LoginRes> {
        this.logger.debug(`Login user ${JSON.stringify(loginUserDto)}`);

        const user = await this.prismaService.user.findUnique({
            where: { email: loginUserDto.email },
        });

        if (!user) {
            throw new HttpException('User not found', 404);
        }

        const isPasswordMatch = await comparePassword(loginUserDto.password, user.password);

        if (!isPasswordMatch) {
            throw new HttpException('Invalid credentials', 401);
        }

        const token = generateToken(user, this.configService);

        delete user.password;

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            token: token,
        };
    }

    async me(id: string): Promise<UserDto> {
        this.logger.debug(`Get user ${id}`);

        const user = await this.prismaService.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new HttpException('User not found', 404);
        }

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role
        }
    }
}
