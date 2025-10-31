import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { PrismaService } from '../common/prisma.service';
import { verifyToken } from 'src/helpers/jwt';
import { ConfigService } from '@nestjs/config';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AuthMiddleware
  implements NestMiddleware<Request, Response> {
  constructor(
    private prismaService: PrismaService,
    private configService: ConfigService,
  ) { }
  async use(req: Request, res: Response, next: (error?: any) => void) {
    const cookies = req.cookies;
    let token = cookies['JWT'] as string;

    if (!token) {
      token = cookies['jwt'] as string;

      if (!token) {
        throw new HttpException('Unauthorized', 401);
      }
    }

    let payload: any;

    try {
      payload = verifyToken(token, this.configService);
    } catch (err) {
      if (err.message === 'jwt expired') {
        throw new HttpException('Token has expired', 401);
      } else if (err.message === 'Email not verified') {
        throw new HttpException('Email not verified', 401);
      } else {
        throw new HttpException('Invalid token', 401);
      }
    }

    const user = await this.prismaService.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    delete user.password;

    req.user = user;
    next();
  }
}

@Injectable()
export class IsOwnerMiddleware implements NestMiddleware<Request, Response> {
  constructor(private prismaService: PrismaService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const loggedInUser = req.user;

    if (!loggedInUser) {
      throw new HttpException('Unauthorized', 401);
    }

    const { id } = req.params;

    if (!id) {
      throw new HttpException('Bad Request', 400);
    }

    const user = await this.prismaService.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new HttpException('User not found', 404);
    }

    if (user.id !== loggedInUser.id && loggedInUser.role !== 'superAdmin') {
      throw new HttpException('Forbidden', 403);
    }

    next();
  }
}

@Injectable()
export class IsAdminMiddleware implements NestMiddleware<Request, Response> {
  constructor(private prismaService: PrismaService) { }

  async use(req: Request, res: Response, next: NextFunction) {
    const loggedInUser = req.user;

    if (!loggedInUser) {
      throw new HttpException('Unauthorized', 401);
    }

    if (loggedInUser.role !== 'admin' && loggedInUser.role !== 'superAdmin') {
      throw new HttpException('Forbidden', 403);
    }

    next();
  }
}