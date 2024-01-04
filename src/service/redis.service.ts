import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis(); 
  }

  public async publishNotification(channel: string, message: string): Promise<void> {
    await this.client.publish(channel, message);
  }

  public async sendFlowerCommentNotification(comment: string): Promise<void> {
    await this.publishNotification('comments', comment);
  }
}
