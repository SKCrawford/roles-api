import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { compare, hash } from 'bcrypt';

import { ConfigService, Logger } from '@lib/core';
import { PrismaService, User } from '@lib/prisma';
import { ResourceId } from '@lib/utils';

interface IUsersService {
  /**
   * Returns true if the raw password is valid, otherwise false.
   * Wrapper for bcrypt's compare method.
   */
  comparePassword(raw: string, user: User): Promise<boolean>;

  /**
   * Create a new user and encrypt its password. This should be the only
   * method used to create new users; all entry-points through the PrismaService
   * will not encrypt the password.
   */
  createUser(email: string, rawPassword: string): Promise<User>;

  /** Return a user by email or throw a 401 error. */
  findByEmailOrFail(email: string): Promise<User>;

  /** Return a user by ID or throw a 401 error. */
  findByIdOrFail(id: ResourceId): Promise<User>;
}

@Injectable()
export class UsersService implements IUsersService {
  private readonly logger = new Logger(UsersService.name);

  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
  ) {}

  /* Wrapper for bcrypt's compare method. */
  public async comparePassword(raw: string, user: User) {
    try {
      return await compare(raw, user.password);
    } catch (err) {
      this.logger.error(err.message, err.stack);
      throw new UnauthorizedException();
    }
  }

  public async createUser(email: string, rawPassword: string) {
    const hashed = await this.hashPassword(rawPassword);
    return await this.prisma.mutation.createUser({
      data: {
        email,
        password: hashed,
        name: {
          create: {}, // Empty name object
        },
      },
    });
  }

  public async findByEmailOrFail(email: string) {
    const user = await this.prisma.query.user({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  public async findByIdOrFail(id: ResourceId) {
    const user = await this.prisma.query.user({
      where: { id },
    });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }

  /* Wrapper for bcrypt's hash method. */
  private async hashPassword(raw: string): Promise<string> {
    try {
      return await hash(raw, this.config.saltRounds);
    } catch (err) {
      this.logger.error(err.message, err.stack);
      throw new InternalServerErrorException();
    }
  }
}
