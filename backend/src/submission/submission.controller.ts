import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto, UpdateSubmissionDto } from 'src/dto/request/submission.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Http } from 'winston/lib/winston/transports';

@ApiTags('Submission')
@Controller('/api/submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) { }

  @Post('/')
  @HttpCode(201)
  @ApiOperation({ summary: 'Create a new submission' })
  @ApiResponse({
    status: 201,
    description: 'The submission has been successfully created.',
    schema: {
      example: {
        message: 'Submission created successfully',
        data: {
          id: 'string',
          name: 'string',
          email: 'string',
          role: 'string',
          password: 'string',
          createdAt: 'string',
          updatedAt: 'string',
        },
        errors: 'string',
      }
    }
  })
  create(@Body() createSubmissionDto: CreateSubmissionDto) {
    // const submission = await this.submissionService.create(createSubmissionDto);

    // return {
    //   message: 'Submission created successfully',
    //   data: submission,
    //   errors: null
    // }
  }
}
