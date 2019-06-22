export type Nullable<T> = T | null;

/** Omit a property P from an existing type T. Source: TypeScript Docs */
export type Omit<P, T> = Pick<P, Exclude<keyof P, T>>;

/** Omit properties *id*, *createdAt*, and *updatedAt* from type T. */
export type OmitMeta<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>;

/** The resources' primary key's type. */
export type ResourceId = string;
