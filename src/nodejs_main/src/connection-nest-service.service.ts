import { Injectable } from '@nestjs/common';
import { ClientProxy, Transport, ClientProxyFactory } from '@nestjs/microservices';

@Injectable()
export class ConnectionNestService {
    private readonly client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://rabbitmq:rabbitmq@rabbitmq-service-node-dev:5672`],
                queue: 'nest_queue',
                queueOptions: { durable: false },
            },
        });
    }

    async apiNesrtSum(): Promise<any> {
        const pattern = { cmd: 'NEST_SERVICE_SUM' };

        return this.client.send<any>(pattern, [3, 7, 1]).toPromise();
    }
}