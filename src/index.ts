declare const VERSION: string;
declare const HASH: string;

export const version = {
  version: VERSION,
  build: HASH
};

export * as array from './array';
