/*
import { Injectable } from '@nestjs/common';
import { ClientProxy, Transport, ClientProxyFactory } from '@nestjs/microservices';

@Injectable()
export class ConnectionLaravelService {
    private readonly client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: [`amqp://rabbitmq:rabbitmq@rabbitmq-service-node-dev:5672`],
                queue: 'laravel_queue',
                queueOptions: { durable: false },
            },
        });
    }

    async apiLaravelTest(): Promise<any> {
        const pattern = { cmd: 'App\\Jobs\\TestJob' };

        return this.client.send<any>(pattern, [1]).toPromise();
    }
}
*/

import {Injectable} from "@nestjs/common";
// import uuid4 from "uuid/v4";
// import {IJob} from "./interfaces/job.interface";
import * as amqp from "amqplib";

@Injectable()
export class ConnectionLaravelService {
    readonly CONNECT = 'amqp://rabbitmq:rabbitmq@rabbitmq-service-node-dev:5672';

    // async send(job: IJob) {
    async apiLaravelTest(): Promise<any> {
        const server = await amqp.connect(this.CONNECT);
        const channel = await server.createChannel();

        // const jobExecuting = job.JOB;
        const jobExecuting = 'App.Jobs.TestJob';

        // delete job.JOB;

        channel.sendToQueue(
            'laravel_queue',
            Buffer.from(
                JSON.stringify({"job":"App\\Jobs\\TestJob", "data": []})
            ),
            {
                headers: {
                    // "rr-id": uuid4(),
                    "rr-job": jobExecuting,
                    "rr-attempt": 1000_000_000_000,
                    "rr-maxAttempts": 1000_000_000_000,
                    "rr-timeout": 1000_000_000_000,
                    "rr-delay": 1000_000_000_000,
                    "rr-retryDelay": 1000_000_000_000,
                }
            }
        );
    }
}