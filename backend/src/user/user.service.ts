import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { UpdateUserDto, UserDto, UserQuery } from 'src/dto/request/user.dto';
import { hashPassword } from 'src/helpers/bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) { }

  async getUsers(query: UserQuery): Promise<UserDto[]> {
    this.logger.debug(`Get users`);

    const whereClause: any = {};

    // 🔍 Filter pencarian (by name / email)
    if (query.search) {
      whereClause.OR = [
        { name: { contains: query.search, mode: 'insensitive' } },
        { email: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    // 🧩 Filter berdasarkan role (jika ada)
    if (query.role) {
      whereClause.role = query.role;
    }

    const users = await this.prismaService.user.findMany({
      where: whereClause,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!users || users.length === 0) {
      throw new HttpException('No users found', 404);
    }

    return users.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    }));
  }

  async getUser(id: string): Promise<UserDto> {
    this.logger.debug(`Get user ${id}`);

    const user = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
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

  async createUser(user: UserDto): Promise<UserDto> {
    this.logger.debug(`Create user ${JSON.stringify(user)}`);

    const existingUser = await this.prismaService.user.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new HttpException('email already exists', 400);
    }

    const createdUser = await this.prismaService.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: await hashPassword(user.password),
        role: user.role,
      },
    })

    return {
      id: createdUser.id,
      name: createdUser.name,
      email: createdUser.email,
      role: createdUser.role,
    };
  }

  async updateUser(id: string, user: UpdateUserDto): Promise<UserDto> {
    this.logger.debug(`Update user ${id}`);

    const existingUser = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new HttpException('User not found', 404);
    }

    const updatedUser = await this.prismaService.user.update({
      where: { id },
      data: {
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });

    return ({
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
      role: updatedUser.role
    })
  }

  async deleteUser(id: string): Promise<UserDto> {
    this.logger.debug(`Delete user ${id}`);

    const existingUser = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      throw new HttpException('User not found', 404);
    }

    const deletedUser = await this.prismaService.user.delete({
      where: { id },
    });

    return ({
      id: deletedUser.id,
      name: deletedUser.name,
      email: deletedUser.email,
      role: deletedUser.role
    })
  }
}
