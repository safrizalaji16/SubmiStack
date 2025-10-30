import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { CreateSubmissionDto, UpdateSubmissionDto } from 'src/dto/request/submission.dto';
import { Logger } from 'winston';

@Injectable()
export class SubmissionService {
  constructor(
    private prismaService: PrismaService,
    // private readonly fileService: FileService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) { }

  async create(createSubmissionDto: CreateSubmissionDto) {
    this.logger.info(`Creating submission ${createSubmissionDto.name}`);

    return this.prismaService.submission.create({ data: createSubmissionDto });
  }
}
