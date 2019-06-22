import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthnPayload } from './authn.dto';
import { AuthnService } from './authn.service';

interface IAuthnResolver {
  login(email: string, rawPassword: string): Promise<AuthnPayload>;
  register(email: string, rawPassword: string): Promise<AuthnPayload>;
}

@Resolver()
export class AuthnResolver implements IAuthnResolver {
  constructor(private readonly service: AuthnService) {}

  @Mutation()
  public async login(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return await this.service.login(email, password);
  }

  @Mutation()
  public async register(
    @Args('email') email: string,
    @Args('password') password: string,
  ) {
    return await this.service.register(email, password);
  }
}
