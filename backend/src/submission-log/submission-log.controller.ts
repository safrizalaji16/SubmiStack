import { Body, Controller, Get, HttpCode, Post, Req } from '@nestjs/common';
import { SubmissionLogService } from './submission-log.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from 'src/dto/response/response.dto';
import { SubmissionLogDto } from 'src/dto/response/submission-log.dto';
import { CreateSubmissionLogDto } from 'src/dto/request/submission-log.dto';
import { Request } from 'express';

@ApiTags('Submission Log')
@Controller('/api/submission-logs')
export class SubmissionLogController {
  constructor(private readonly submissionLogService: SubmissionLogService) { }

  @Get('/')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all submission logs' })
  @ApiResponse({
    status: 200, description: 'Success', schema: {
      example: {
        message: 'Submission logs fetched successfully',
        data: [
          {
            id: '00000000-0000-0000-0000-000000000000',
            userId: '00000000-0000-0000-0000-000000000000',
            performedBy: '00000000-0000-0000-0000-000000000000',
            timestamp: '2021-01-01T00:00:00.000Z'
          },
        ],
        errors: null
      }
    }
  })
  async findAll(): Promise<ResponseDto<SubmissionLogDto[]>> {
    const submissionLogs = await this.submissionLogService.findAll();

    return {
      message: 'Submission logs fetched successfully',
      data: submissionLogs,
      errors: null
    }
  }

  @Post('/')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create submission log' })
  @ApiResponse({
    status: 201,
    description: 'Success',
    schema: {
      example: {
        message: 'Submission log created successfully',
        data: {
          id: '00000000-0000-0000-0000-000000000000',
          userId: '00000000-0000-0000-0000-000000000000',
          performedBy: '00000000-0000-0000-0000-000000000000',
          timestamp: '2021-01-01T00:00:00.000Z'
        },
        errors: null
      }
    }
  })
  async create(
    @Req() req: Request,
    @Body() createSubmissionLogDto: CreateSubmissionLogDto
  ): Promise<ResponseDto<SubmissionLogDto>> {
    createSubmissionLogDto.performedBy = req.user.id

    const submissionLog = await this.submissionLogService.create(createSubmissionLogDto);

    return {
      message: 'Submission log created successfully',
      data: submissionLog,
      errors: null
    }
  }
}
