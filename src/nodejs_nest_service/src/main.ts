import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: [`amqp://rabbitmq:rabbitmq@rabbitmq-service-node-dev:5672`],
      queue: 'nest_queue',
      queueOptions: { durable: false },
    },
  });
  app.listen(() => console.log('Microservice is listening'));
}
bootstrap();