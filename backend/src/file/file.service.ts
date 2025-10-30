import { HttpException, Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { PrismaService } from 'src/common/prisma.service';
import { Logger } from 'winston';
import ImageKit from 'imagekit';
import { ResponseDto } from 'src/dto/response/response.dto';
import { FileDto } from 'src/dto/response/file.dto';
import { extname } from 'path';

@Injectable()
export class FileService {
    constructor(
        private prismaService: PrismaService,
        @Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger,
        @Inject('IMAGEKIT') private readonly imageKit: ImageKit
    ) { }

    private readonly allowedExtensions = ['.jpg', '.png', '.jpeg']; // Add allowed extensions
    private readonly maxFileSize = 100 * 1024 * 1024; // 100MB (adjust as needed)

    async uploadFile(file: Express.Multer.File) {
        this.logger.info('Uploading file...');

        const fileExt = extname(file.originalname).toLowerCase();

        if (!this.allowedExtensions.includes(fileExt)) {
            throw new HttpException('Unsupported file type', 400);
        }

        if (file.size > this.maxFileSize) {
            throw new HttpException('File size exceeds the limit', 400);
        }

        const fileName = file.originalname.replace(/\s+/g, '_');

        try {
            const imageKit = await this.imageKit.upload({
                file: file.buffer.toString('base64'),
                fileName: fileName
            })

            const uploadedFile = await this.prismaService.image.create({
                data: {
                    path: imageKit.filePath,
                    fileName: imageKit.name,
                    url: imageKit.url
                },
                select: {
                    id: true,
                    path: true,
                    fileName: true,
                    url: true,
                    createdAt: true,
                    updatedAt: true
                }
            })

            return uploadedFile
        } catch (error) {
            throw new HttpException('File upload failed', 500);
        }
    }
}
