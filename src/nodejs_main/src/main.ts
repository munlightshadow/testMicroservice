import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://rabbitmq:rabbitmq@rabbitmq-service-node-dev:5672`],
      queue: 'main_queue',
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservicesAsync();
  await app.listen(3000);
}
bootstrap();