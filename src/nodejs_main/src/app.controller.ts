import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ConnectionNestService } from "./connection-nest-service.service";
import { ConnectionLaravelService } from "./connection-laravel-service.service";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
              private readonly connectionNestService: ConnectionNestService,
              private readonly connectionLaravelService: ConnectionLaravelService) {}

  @Get()
  async getHello(): Promise<string> {
    return  String(await this.connectionNestService.apiNesrtSum());

    // return this.appService.getHello();
  }

  @Get('/laravel')
  async getHelloFromLaravel(): Promise<string> {
    //return  String(await this.connectionNestService.apiNesrtSum());
    return  String(await this.connectionLaravelService.apiLaravelTest());

    // return this.appService.getHello();
  }  
}
