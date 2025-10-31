import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { CreateSubmissionLogDto } from 'src/dto/request/submission-log.dto';
import { SubmissionLogDto } from 'src/dto/response/submission-log.dto';
import { Logger } from 'winston';

@Injectable()
export class SubmissionLogService {
    constructor(
        private prismaService: PrismaService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
    ) { }

    async findAll(): Promise<SubmissionLogDto[]> {
        this.logger.info('Finding all submission logs');

        return this.prismaService.submissionLog.findMany();
    }

    async create(createSubmissionLogDto: CreateSubmissionLogDto): Promise<SubmissionLogDto> {
        this.logger.info(`Creating submission log ${createSubmissionLogDto.action}`);

        return this.prismaService.submissionLog.create({
            data: {
                action: createSubmissionLogDto.action,
                submissionId: createSubmissionLogDto.submissionId,
                performedBy: createSubmissionLogDto.performedBy
            }
        });
    }
}
