import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { LogMiddleware } from './middlewares/log.middleware';
import { AuthMiddleware, IsAdminMiddleware, IsOwnerMiddleware } from './middlewares/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { SubmissionModule } from './submission/submission.module';
import { FileModule } from './file/file.module';
import { SubmissionLogModule } from './submission-log/submission-log.module';

@Module({
  imports: [CommonModule, UserModule, AuthModule, SubmissionModule, FileModule, SubmissionLogModule],
  providers: [LogMiddleware, AuthMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('/api/*');
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: '/api/auth/login', method: RequestMethod.POST },
        { path: '/api/auth/register', method: RequestMethod.POST },
        { path: '/api/auth/logout', method: RequestMethod.GET },
      )
      .forRoutes('/api/*');
    consumer
      .apply(IsAdminMiddleware)
      .forRoutes(
        { path: '/api/auth/admin/login', method: RequestMethod.DELETE },
        { path: '/api/users', method: RequestMethod.GET },
        { path: '/api/users', method: RequestMethod.POST },
        { path: '/api/users', method: RequestMethod.DELETE },
      )
    consumer
      .apply(IsOwnerMiddleware)
      .forRoutes(
        { path: '/api/users/:id', method: RequestMethod.PUT },
        { path: '/api/users/change-password/:id', method: RequestMethod.PATCH },
      );
  }
}
