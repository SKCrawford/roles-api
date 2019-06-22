import { AuthnOutput } from '@lib/gql-bindings';

/** Response body's *data* for the login and register mutations. */
export class AuthnPayload extends AuthnOutput {
  public readonly token: string;
}
