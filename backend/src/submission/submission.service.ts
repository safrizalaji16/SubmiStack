import { HttpException, Inject, Injectable } from '@nestjs/common';
import { Action } from '@prisma/client';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { CreateSubmissionDto, UpdateSubmissionDto } from 'src/dto/request/submission.dto';
import { SubmissionDto } from 'src/dto/response/submission.dto';
import { Logger } from 'winston';

@Injectable()
export class SubmissionService {
  constructor(
    private prismaService: PrismaService,
    @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger
  ) { }

  async findAll(): Promise<SubmissionDto[]> {
    this.logger.info('Finding all submissions');

    return this.prismaService.submission.findMany({ include: { user: true, image: true } });
  }

  async findOne(id: string): Promise<SubmissionDto> {
    this.logger.info(`Finding submission ${id}`);

    const submission = this.prismaService.submission.findUnique({ where: { id }, include: { user: true, image: true } });

    if (!submission) {
      throw new HttpException('Submission not found', 404);
    }

    return submission;
  }

  async create(createSubmissionDto: CreateSubmissionDto): Promise<SubmissionDto> {
    this.logger.info(`Creating submission ${createSubmissionDto.name}`);


    const submission = await this.prismaService.submission.create({
      data: {
        name: createSubmissionDto.name,
        email: createSubmissionDto.email,
        phone: createSubmissionDto.phone,
        userId: createSubmissionDto.userId,
        imageId: createSubmissionDto.imageId
      }
    });

    await this.prismaService.submissionLog.create({
      data: {
        action: Action.create,
        submissionId: submission.id,
        performedBy: submission.userId
      }
    });

    return submission;
  }

  async update(id: string, updateSubmissionDto: UpdateSubmissionDto): Promise<SubmissionDto> {
    this.logger.info(`Updating submission ${id}`);

    const submission = await this.prismaService.submission.findUnique({ where: { id } });

    if (!submission) {
      throw new HttpException('Submission not found', 404);
    }

    await this.prismaService.submissionLog.create({
      data: {
        action: Action.update,
        submissionId: submission.id,
        performedBy: submission.userId
      }
    });

    return this.prismaService.submission.update({
      where: { id },
      data: updateSubmissionDto
    })
  }

  async remove(id: string): Promise<SubmissionDto> {
    this.logger.info(`Deleting submission ${id}`);

    const submission = await this.prismaService.submission.findUnique({ where: { id } });

    if (!submission) {
      throw new HttpException('Submission not found', 404);
    }

    await this.prismaService.submissionLog.create({
      data: {
        action: Action.delete,
        submissionId: submission.id,
        performedBy: submission.userId
      }
    });

    return this.prismaService.submission.delete({ where: { id } });
  }
}
