import { Readable } from 'stream';

import {
  GetObjectCommand,
  HeadObjectCommand,
  NotFound,
  PutObjectCommand,
  PutObjectCommandOutput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { Injectable } from '@nestjs/common';

import { ConfigService } from '../config/config.service';

@Injectable()
export class S3Service {
  private readonly s3Client: S3Client;

  constructor(private readonly configService: ConfigService) {
    this.s3Client = new S3Client({
      region: this.configService.env.S3_REGION,
      endpoint: this.configService.env.S3_ENDPOINT,
      credentials: {
        accessKeyId: this.configService.env.S3_ACCESS_KEY_ID,
        secretAccessKey: this.configService.env.S3_SECRET_ACCESS_KEY,
      },
      forcePathStyle: true,
    });
  }

  public putObject({
    key,
    data,
    contentType,
  }: {
    key: string;
    data: string | Uint8Array | Buffer | Readable;
    contentType: string;
  }): Promise<PutObjectCommandOutput> {
    return this.s3Client.send(
      new PutObjectCommand({
        Bucket: this.configService.env.S3_BUCKET,
        Key: key,
        Body: data,
        ContentType: contentType,
      }),
    );
  }

  public async objectExists({ key }: { key: string }): Promise<boolean> {
    try {
      await this.s3Client.send(
        new HeadObjectCommand({
          Bucket: this.configService.env.S3_BUCKET,
          Key: key,
        }),
      );
      return true;
    } catch (error) {
      if (error instanceof NotFound) return false;
      throw error;
    }
  }

  public getSignedUrl({ key }: { key: string }): Promise<string> {
    return getSignedUrl(
      this.s3Client,
      new GetObjectCommand({
        Bucket: this.configService.env.S3_BUCKET,
        Key: key,
      }),
      { expiresIn: 60 * 15 },
    );
  }
}
