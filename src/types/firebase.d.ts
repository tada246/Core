import { Timestamp } from 'firebase/firestore';
import { message_type, writer } from '../data/notice';
import { authority } from '../store/authority';

type AdminUser = {
    id: string;
    name: string;
    photoURL: string;
    authority: (typeof authority)[number]['id'];
    mail: string;
    timestamp: Timestamp;
};

type EventPlace = {
    name: string;
    lat: number;
    lng: number;
};

type Event = {
    id: string;
    isPublic: boolean;
    name: string;
    link: string;
    date: {
        start: Timestamp;
        end: Timestamp;
    };
    imageURL: string;
    overview: string;
    mapImageURL: string;
    isStampRallyEnabled: boolean;
    place?: EventPlace;
};

type Image = {
    id: string;
    url: string;
    timestamp: Timestamp;
};

type Notice = {
    id: string;
    timestamp: Timestamp;
    title: string;
    type: (typeof message_type)[number]['id'];
    writer: (typeof writer)[number][];
    content: string;
};

type Form = {
    id: string;
    name: string;
    order: number;
    url: string;
    content: string;
};

type Place = {
    id: string;
    name: string;
    location: {
        x: number;
        y: number;
    };
    imageURL: string;
};

type Floor = {
    id: string;
    name: string;
    order: number;
    mapImageURL?: string;
};

type Entertainment = {
    id: string;
    name: string;
    explanation: string;
    imageURL: string;
    order: number;
    overview: string;
    date: {
        start: Timestamp;
        end: Timestamp;
    };
    place?: string;
    location?: {
        x: number;
        y: number;
    };
};

type StampRally = {
    id: string;
    name: string;
    hint: string;
    order: number;
    imageURL: string;
};

type StampRallySecret = {
    id: string;
    secretId: string;
};

export type {
    AdminUser,
    Event,
    Image,
    Notice,
    Form,
    Place,
    Floor,
    Entertainment,
    StampRally,
    StampRallySecret,
    EventPlace,
};
