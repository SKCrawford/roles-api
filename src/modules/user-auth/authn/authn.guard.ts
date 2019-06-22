import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import { Logger } from '@lib/core';
import { AuthnService } from './authn.service';

/** An incoming request that may or may not have appropriate 'authorization' headers. */
type RequestWithAuthHeaders = Request & {
  headers: {
    authorization?: string,
  },
};

/**
 * Given a JWT in the request header 'Authorization', add the user
 * to the GraphQL context and permit access to the endpoint.
 */
@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private readonly service: AuthnService) {}

  public async canActivate(context: ExecutionContext) {
    let token: string = 'no token';

    try {
      const metadata = await this.getMetadataFromContext(context);

      // Parse JWT, authn user, and add the user to the GraphQL context
      const ctx = GqlExecutionContext.create(context).getContext();
      token = await this.getTokenFromRequest(ctx.req);
      ctx.user = await this.service.getUserFromToken(token);

      this.logger.debug(`Authenticated ${ctx.user.email} for ${metadata.resolver} # ${metadata.endpoint}`);
      return Boolean(ctx.user);
    } catch (err) {
      this.logger.error(`Failed to load user into context from JWT: ${token}`);
      throw new UnauthorizedException();
    }
  }

  public async getTokenFromRequest(req: RequestWithAuthHeaders): Promise<string> {
    if (!req || !req.headers || !req.headers.authorization) {
      const msg = 'JWT not found in request\'s Authorization header';
      this.logger.warn(msg);
      throw new UnauthorizedException(msg);
    }
    return req.headers.authorization;
  }

  /** Get debug information pertaining to an authentication attempt. */
  private async getMetadataFromContext(context: ExecutionContext) {
    const [resolver, endpoint] = await Promise.all([
      this.getResolverNameFromContext(context),
      this.getEndpointNameFromContext(context),
    ]);
    return { resolver, endpoint };
  }

  /** Get the name of the protected resolver or '?' if resolver is not guarded at class level. */
  private async getResolverNameFromContext(context: ExecutionContext): Promise<string> {
    try {
      return context.getClass().name;
    } catch (err) {
      return '?';
    }
  }

  /** Get the name of the protected endpoint or '?' if the endpoint is not guarded at method level. */
  private async getEndpointNameFromContext(context: ExecutionContext): Promise<string> {
    try {
      return context.getHandler().name;
    } catch (err) {
      return '?';
    }
  }
}
