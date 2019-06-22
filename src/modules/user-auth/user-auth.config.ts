/** Cost of salt generation. Default is 8. */
export const saltRounds: number = Number(process.env.SALT_ROUNDS ) || 8;

/** JWT secret key. */
export const jwtKey: string = process.env.JWT_KEY || 'devsecretkey';

/** Lifetime duration of a JWT. Defaults to 24 hours. */
export const jwtExpiresInSeconds: number = Number(process.env.JWT_EXPIRES_IN_SECONDS) || 1 * 60 * 60 * 24;
