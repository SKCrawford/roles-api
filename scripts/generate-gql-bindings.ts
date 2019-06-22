import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

enum Config {
  // Intentionally includes prisma-related graphql files
  // Use this to exclude prisma-related files
  // src/**/(!prisma).*.graphql
  InputPaths = 'src/**/*.graphql',
  OutputPath = 'src/modules/bundled.gql-bindings.ts',
}

const options = {
  outputAs: 'class' as 'class',
  path: join(process.cwd(), Config.OutputPath),
  typePaths: [join(process.cwd(), Config.InputPaths)],
};

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate(options).then(() => {
  console.log(`[MakeTypes] Generated GraphQL Typescript bindings at ${Config.OutputPath}`);
});
