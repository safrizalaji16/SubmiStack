import { Controller, HttpCode, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileService } from './file.service';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from 'src/dto/request/file.dto';
import { ResponseDto } from 'src/dto/response/response.dto';
import { FileDto } from 'src/dto/response/file.dto';

@ApiTags('File')
@Controller('/api/files')
export class FileController {
  constructor(private readonly fileService: FileService) { }

  @Post('/uploads')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Uploads a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: FileUploadDto,
  })
  @ApiResponse({
    status: 200,
    description: 'File uploaded successfully',
    schema: {
      example: {
        message: 'File uploaded successfully',
        data: {
          id: '00000000-0000-0000-0000-000000000000',
          path: '/testfile.png',
          file_name: 'testfile.png',
          url: 'https://ik.imagekit.io/users/testfile.png',
          updated_at: '2024-09-10T08:21:41.495Z',
          created_at: '2024-09-10T08:21:41.495Z',
        },
        errors: null
      }
    }
  })
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<ResponseDto<FileDto>> {
    const uploadedFile = await this.fileService.uploadFile(file);

    return {
      message: 'File uploaded successfully',
      data: uploadedFile,
      errors: null
    };

  }
}
