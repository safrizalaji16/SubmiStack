import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";

export class CreateSubmissionDto {
    @ApiProperty({
        type: String,
        default: '00000000-0000-0000-0000-000000000000',
    })
    userId: string;

    @ApiProperty({
        type: String,
        default: 'test'
    })
    name: string

    @ApiProperty({
        type: String,
        default: 'test@mail.com'
    })
    email: string

    @ApiProperty({
        type: String,
        default: '0123456789'
    })
    phone: string

    @ApiProperty({
        type: String,
        default: '00000000-0000-0000-0000-000000000000',
    })
    imageId: string;
}

export class SubmissionQuery {
    @ApiPropertyOptional({
        type: String,
        default: 'test',
    })
    search?: string;
}

export class UpdateSubmissionDto extends PartialType(CreateSubmissionDto) {
    @ApiProperty({
        type: String,
        default: 'test',
    })
    name: string;

    @ApiProperty({
        type: String,
        default: 'test@mail.com',
    })
    email: string;

    @ApiProperty({
        type: String,
        default: '0123456789!',
    })
    phone: string;

    @ApiProperty({
        type: String,
        default: '00000000-0000-0000-0000-000000000000',
    })
    imageId: string;
}