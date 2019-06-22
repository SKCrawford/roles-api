import { createParamDecorator } from '@nestjs/common';

import { User } from '@lib/gql-bindings';

/** Inject the User from the context into the resolver. Requires the AuthnGuard. */
export const InjUser = createParamDecorator(
  (data, [root, args, ctx, info]): User => ctx.user,
);
