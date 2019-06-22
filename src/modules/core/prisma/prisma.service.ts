import { Injectable } from '@nestjs/common';

import { Prisma } from './prisma.generated';

@Injectable()
export class PrismaService extends Prisma {
  constructor() {
    super({
      endpoint: 'http://localhost:4466/',
      debug: true,
    });
  }
}
