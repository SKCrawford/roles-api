import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

import { CoreModule } from './core';
import { UserAuthModule } from './user-auth';

const graphqlModuleOptions = {
  // Expose the HTTP request to the GraphQL context
  context: ({ req }: Record<'req', any>) => ({ req }),
  debug: true,
  typePaths: [join(process.cwd(), 'src/modules/**/*.graphql')],
};

@Module({
  imports: [
    GraphQLModule.forRoot(graphqlModuleOptions),
    CoreModule,
    UserAuthModule,
  ],
})
export class BundledModule {}
