type AdminUser = {
    id: string;
    iconURL: string;
    authority: string;
    mail: string;
    timestamp: any;
};

type Event = {
    isPublic: boolean;
    id: string;
    name: string;
    link: string;
    date: {
        start: any;
        end: any;
    };
    forms: {
        id: string;
        name: string;
        url: string;
        order: number;
        content: string;
        timestamp: any;
    }[];
    imageURL: string;
    overview: string;
    explanation: string;
    map: {
        imageURL: string;
        places: {
            id: string;
            name: string;
            location: {
                x: number;
                y: number;
            };
            explanation: string;
            floor: {
                id: string;
                name: string;
                order: number;
                events: {
                    id: string;
                    name: string;
                    overview: string;
                    order: number;
                    imageURL: string;
                    content: string;
                    class: string;
                    time: {
                        start: any;
                        end: any;
                    };
                    tags: string[];
                    shops: {
                        id: string;
                        name: string;
                        imageURL: string;
                        available: boolean;
                        price: number;
                        overview: string;
                    }[];
                }[];
            }[];
        }[];
    };
};

export type { AdminUser, Event };
