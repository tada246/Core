import { atom } from 'jotai';
import { AdminUser } from '../types/firebase';
import { User as AuthUser } from 'firebase/auth';

interface _User extends AuthUser {
    data: AdminUser | undefined;
}

export type User = _User | undefined;

export const user = atom<User>(undefined);
