import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '@lib/prisma';
import { ResourceId } from '@lib/utils';
import { UsersService } from '../users';
import { AuthnPayload } from './authn.dto';

interface IAuthnService {
  /** Parse a JWT and retrieve the user. */
  getUserFromToken(token: string): Promise<User>;

  /** Generate a JWT for an existing user. */
  login(email: string, rawPassword: string): Promise<AuthnPayload>;

  /**
   * Create a new user and generate a JWT. This should
   * be the only method for user creation.
   */
  register(email: string, rawPassword: string): Promise<AuthnPayload>;
}

@Injectable()
export class AuthnService implements IAuthnService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async getUserFromToken(token: string) {
    const id = await this.decodeJwt(token);
    return await this.usersService.findByIdOrFail(id);
  }

  public async login(email: string, rawPassword: string) {
    const user = await this.usersService.findByEmailOrFail(email);
    if (!user || !await this.usersService.comparePassword(rawPassword, user)) {
      throw new UnauthorizedException();
    }
    const token = await this.signJwt(user.id);
    return { token };
  }

  public async register(email: string, rawPassword: string) {
    const user = await this.usersService.createUser(email, rawPassword);
    const token = await this.signJwt(user.id);
    return { token };
  }

  /* Sign JWT using the user's ID. Wraps JwtModule's JwtService#sign. */
  private async signJwt(id: ResourceId): Promise<string> {
    return await this.jwtService.signAsync({ id });
  }

  /* Extract the user's ID from the JWT. Wraps JwtModule's JwtService#decode. */
  private async decodeJwt(token: string): Promise<ResourceId> {
    const { id } = this.jwtService.decode(token) as { id: ResourceId };
    return id;
  }
}
