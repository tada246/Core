import { atom } from 'jotai';
import { AdminUser } from '../types/firebase';

export type User =
    | {
          uid: string;
          email: string;
          providerId: string;
          displayName: string;
          photoURL: string;
          isAnonymous: boolean;
          metadata: {
              createdAt: string | undefined;
              creationTime: string | undefined;
              lastSignInTime: string | undefined;
          };
          data: AdminUser | undefined;
      }
    | undefined;

export const user = atom<User>(undefined);
