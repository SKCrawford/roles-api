#!/bin/bash

# Generate Typescript bindings for all .graphql files. Calling
# this script allows for any patching to the generated bindings.

echo "[MakeTypes] Generating GraphQL Typescript bindings"
yarn ts-node scripts/generate-gql-bindings.ts

# Patch bug related to ordering of required and optional parameters
# Old line:
# abstract executeRaw(database?: PrismaDatabase, query: string): Json | Promise<Json>;
# New line
# abstract executeRaw(database?: PrismaDatabase, query: string): Json | Promise<Json>;

echo "[MakeTypes] Patching required/optional parameter ordering"
sed -i 's/database?: PrismaDatabase/database: PrismaDatabase/' src/modules/bundled.gql-bindings.ts
