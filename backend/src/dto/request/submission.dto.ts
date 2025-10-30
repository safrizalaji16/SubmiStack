import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateSubmissionDto {
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
}

export class UpdateSubmissionDto extends PartialType(CreateSubmissionDto) { }