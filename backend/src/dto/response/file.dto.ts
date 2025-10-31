import { ApiProperty } from '@nestjs/swagger';

export class FileDto {
  @ApiProperty({
    type: String,
    default: '00000000-0000-0000-0000-000000000000',
  })
  id: string;

  @ApiProperty({
    type: String,
    default: '/test.png',
  })
  path: string;

  @ApiProperty({
    type: String,
    default: 'testfile.png',
  })
  fileName: string;

  @ApiProperty({
    type: String,
    default: 'https://ik.imagekit.io/users/testfile.png',
  })
  url: string;

  @ApiProperty({
    type: String,
    format: 'date-time',
    default: '2024-01-01T01::41.495Z',
  })
  createdAt: Date;

  @ApiProperty({
    type: String,
    format: 'date-time',
    default: '2024-01-01T01::41.495Z',
  })
  updatedAt: Date;
}
