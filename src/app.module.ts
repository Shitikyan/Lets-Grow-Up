import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './module/user.module';
import { FlowerModule } from './module/flower.module';
import { RoleModule } from './module/role.module';
import { OrderModule } from './module/order.module';
import { PassportModule } from '@nestjs/passport';

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
      synchronize: false,
    }),
    UserModule,
    FlowerModule,
    RoleModule,
    OrderModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
