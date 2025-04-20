// new Firestore Data Types

export interface User {
    id: string;
    name: string;
    photoURL: string;
    mail: string;
    isDisabled: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}
