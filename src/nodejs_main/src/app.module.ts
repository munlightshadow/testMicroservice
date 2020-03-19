import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConnectionNestService } from "./connection-nest-service.service";
import { ConnectionLaravelService } from "./connection-laravel-service.service";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, ConnectionNestService, ConnectionLaravelService],
})
export class AppModule {}
