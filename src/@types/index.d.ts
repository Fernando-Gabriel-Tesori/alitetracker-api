import { User } from './use.type';

export {};

declare global {
  namespace Express {
    export interface Request {
      user: User;
    }
  }
}
