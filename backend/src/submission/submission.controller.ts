import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, Req, Put } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto, UpdateSubmissionDto } from 'src/dto/request/submission.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { ResponseDto } from 'src/dto/response/response.dto';
import { SubmissionDto } from 'src/dto/response/submission.dto';

@ApiTags('Submission')
@Controller('/api/submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) { }

  @Get('/')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get all submissions' })
  @ApiResponse({
    status: 200,
    description: 'The submissions have been successfully fetched.',
    schema: {
      example: {
        message: 'Submissions fetched successfully',
        data: [
          {
            id: '00000000-0000-0000-0000-000000000000',
            name: 'test',
            email: 'test@mail.com',
            role: 'string',
            createdAt: '2024-09-30T13:01:33.011Z',
            updatedAt: '2024-09-30T13:01:33.011Z',
          },
        ],
        errors: null,
      }
    }
  })
  async findAll(): Promise<ResponseDto<SubmissionDto[]>> {
    const submissions = await this.submissionService.findAll();

    return {
      message: 'Submissions fetched successfully',
      data: submissions,
      errors: null
    }
  }

  @Get('/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Get a submission by id' })
  @ApiResponse({
    status: 200,
    description: 'The submission has been successfully fetched.',
    schema: {
      example: {
        message: 'Submission fetched successfully',
        data: {
          id: '00000000-0000-0000-0000-000000000000',
          name: 'test',
          email: 'test@mail.com',
          phone: '0123456789',
          createdAt: '2024-09-30T13:01:33.011Z',
          updatedAt: '2024-09-30T13:01:33.011Z',
        },
        errors: null,
      }
    }
  })
  async findOne(@Param('id') id: string): Promise<ResponseDto<SubmissionDto>> {
    const submission = await this.submissionService.findOne(id);

    return {
      message: 'Submission fetched successfully',
      data: submission,
      errors: null
    }
  }

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
          id: '00000000-0000-0000-0000-000000000000',
          name: 'test',
          email: 'test@mail.com',
          phone: '0123456789',
          createdAt: '2024-09-30T13:01:33.011Z',
          updatedAt: '2024-09-30T13:01:33.011Z',
        },
        errors: null,
      }
    }
  })
  async create(
    @Req() req: Request,
    @Body() createSubmissionDto: CreateSubmissionDto
  ): Promise<ResponseDto<SubmissionDto>> {
    createSubmissionDto.userId = req.user.id

    const submission = await this.submissionService.create(createSubmissionDto);

    return {
      message: 'Submission created successfully',
      data: submission,
      errors: null
    }
  }

  @Put('/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Update a submission' })
  @ApiResponse({
    status: 200,
    description: 'The submission has been successfully updated.',
    schema: {
      example: {
        message: 'Submission updated successfully',
        data: {
          id: '00000000-0000-0000-0000-000000000000',
          name: 'test',
          email: 'test@mail.com',
          phone: '0123456789',
          createdAt: '2024-09-30T13:01:33.011Z',
          updatedAt: '2024-09-30T13:01:33.011Z',
        },
        errors: null,
      }
    }
  })
  async update(@Param('id') id: string, @Body() updateSubmissionDto: UpdateSubmissionDto): Promise<ResponseDto<SubmissionDto>> {
    const submission = await this.submissionService.update(id, updateSubmissionDto);

    return {
      message: 'Submission updated successfully',
      data: submission,
      errors: null
    }
  }

  @Delete('/:id')
  @HttpCode(200)
  @ApiOperation({ summary: 'Delete a submission' })
  @ApiResponse({
    status: 200,
    description: 'The submission has been successfully deleted.',
    schema: {
      example: {
        message: 'Submission deleted successfully',
        data: {
          id: '00000000-0000-0000-0000-000000000000',
          name: 'test',
          email: 'test@mail.com',
          phone: '0123456789',
          createdAt: '2024-09-30T13:01:33.011Z',
          updatedAt: '2024-09-30T13:01:33.011Z',
        },
        errors: null,
      }
    }
  })
  async delete(@Param('id') id: string): Promise<ResponseDto<SubmissionDto>> {
    const submission = await this.submissionService.remove(id);

    return {
      message: 'Submission deleted successfully',
      data: submission,
      errors: null
    }
  }
}
