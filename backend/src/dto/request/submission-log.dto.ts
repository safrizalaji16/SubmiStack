import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { Action } from "@prisma/client";

export class CreateSubmissionLogDto {
    @ApiProperty({
        enum: Action,
        default: Action.create,
    })
    action: Action;

    @ApiProperty({
        type: String,
        default: '00000000-0000-0000-0000-000000000000',
    })
    submissionId: string;

    @ApiProperty({
        type: String,
        default: '00000000-0000-0000-0000-000000000000',
    })
    performedBy: string;
}

export class SubmissionLogQuery {
    @ApiPropertyOptional({
        type: String,
        default: 'test',
    })
    search?: string;
}