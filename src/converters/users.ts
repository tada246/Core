import { FirestoreDataConverter } from 'firebase/firestore';
import { User } from '../types/firestore';

export const userConverter: FirestoreDataConverter<User> = {
    toFirestore: (user: User) => user,
    fromFirestore: (snapshot) => {
        const data = snapshot.data();
        return {
            id: snapshot.id,
            name: data.name,
            photoURL: data.photoURL,
            mail: data.mail,
            isDisabled: data.isDisabled,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
        } as User;
    },
};
