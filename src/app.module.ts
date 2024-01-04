// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user.module';
import { FlowerModule } from './module/flower.module';
import { RoleModule } from './module/role.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '0.0.0.0',
      port: 5432,
      username: 'postgres',
      password: 'mysecretpassword',
      database: 'mydatabase',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Should be false in production
    }),
    UserModule, FlowerModule, RoleModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
