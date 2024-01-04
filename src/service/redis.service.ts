// redis.service.ts
import { Injectable } from '@nestjs/common';
import  Redis from 'ioredis';

@Injectable()
export class RedisService {
  private readonly client: Redis;

  constructor() {
    this.client = new Redis(); // Initialize the Redis client
    this.setupSubscriptions(); // Set up subscriptions for notification channels
  }

  // Method to publish notifications to a specific channel
  public async publishNotification(channel: string, message: string): Promise<void> {
    await this.client.publish(channel, message);
  }

  // Method to handle subscription to notification channels
  private setupSubscriptions(): void {
    this.client.subscribe('notifications'); // Subscribe to the 'notifications' channel

    // Handle incoming messages on the subscribed channel
    this.client.on('message', (channel, message) => {
      // Implement logic to process incoming messages (notifications) here
      console.log(`Received notification on channel ${channel}: ${message}`);
      // Process the incoming message and trigger respective actions
    });
  }
}
