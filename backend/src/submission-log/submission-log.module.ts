import { Module } from '@nestjs/common';
import { SubmissionLogService } from './submission-log.service';
import { SubmissionLogController } from './submission-log.controller';

@Module({
  controllers: [SubmissionLogController],
  providers: [SubmissionLogService],
  exports: [SubmissionLogService],
})
export class SubmissionLogModule { }
