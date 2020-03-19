import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class MathController {
    @MessagePattern({ cmd: 'NEST_SERVICE_SUM' })
    accumulate(data: number[]): number {
        return (data || []).reduce((a, b) => a + b);
    }
}