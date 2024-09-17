import {
    collection,
    query,
    orderBy,
    limit,
    getDocs,
    Query,
    DocumentData,
    startAt,
} from 'firebase/firestore';
import useSWRInfinite from 'swr/infinite';
import { db } from '../features/firebase';
import { Image } from '../types/firebase';

const IMAGES_PER_PAGE = 12;
const API_URL_KEY = '/api/images';

export default function useAllImages() {
    const getKey = (pageIndex: number, previousPageData: Image[]) => {
        if (previousPageData && !previousPageData.length) return null; // 最後に到達した場合
        let lastDocTime: number | undefined;
        if (previousPageData) {
            lastDocTime =
                previousPageData[previousPageData.length - 1].timestamp
                    .seconds * 1000;
        }
        return [API_URL_KEY, pageIndex + 1, IMAGES_PER_PAGE, lastDocTime];
    };

    const fetcher = async (value: [string, number, number, number?]) => {
        let imagesQuery: Query<DocumentData, DocumentData>;
        const [_, pageIndex, _limit, lastDocTime] = value;

        if (pageIndex === 0 || !lastDocTime || !pageIndex) {
            imagesQuery = query(
                collection(db, 'images'),
                orderBy('timestamp', 'desc'),
                limit(IMAGES_PER_PAGE)
            );
        } else {
            imagesQuery = query(
                collection(db, 'images'),
                orderBy('timestamp', 'desc'),
                startAt(new Date(lastDocTime)),
                limit(IMAGES_PER_PAGE)
            );
        }

        const snapshot = await getDocs(imagesQuery);
        const data = snapshot.docs.map((doc) => doc.data()) as Image[];

        return data;
    };

    const {
        data: imagesList,
        error,
        size,
        setSize,
    } = useSWRInfinite<Image[], Error>(getKey, fetcher, {
        revalidateOnFocus: false,
        revalidateIfStale: false,
        errorRetryInterval: 100000,
        focusThrottleInterval: 100000,
    });

    const loadMoreImages = () => {
        setSize(size + 1);
    };

    const isLast = imagesList
        ? imagesList.filter((list) => list.length < IMAGES_PER_PAGE).length > 0
        : false;
    const images = imagesList ? imagesList.flat() : [];

    return {
        data: images,
        isLast,
        isLoading: !images && !error,
        error,
        loadMoreImages,
    };
}
