import { HttpException, Inject, Injectable, Logger } from '@nestjs/common';
import { Role } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { UserDto } from 'src/dto/request/user.dto';

@Injectable()
export class UserService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
  ) { }

  async getUsers(role: Role[]): Promise<UserDto[]> {
    this.logger.debug(`Get users`);

    const whereClause = {};

    if (role && role.length > 0) {
      whereClause['role'] = { in: role };
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
      }
    });

    if (!users.length) {
      throw new HttpException('No users found', 404);
    }

    return users.map((user) => ({
      name: user.name,
      email: user.email,
      role: user.role,
    }));
  }
}
