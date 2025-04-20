import { Route, Routes } from 'react-router-dom';
import {
    AccountPage,
    ImagesPage,
    DevelopersPage,
    FormPage,
    HelpPage,
    HomePage,
    ManagePage,
    MapPage,
    EventsPage,
    NotFoundPage,
    PlacePage,
    UploadPage,
    Message,
    MarkDownPage,
    StampRallyPage,
} from './pages';
import 'dayjs/locale/ja';
import dayjs from 'dayjs';

dayjs.locale('ja');

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />

            {/* <Route path='/for-developers' element={<DevelopersPage />} /> */}
            {/* <Route path='/help' element={<HelpPage />} /> */}
            {/* <Route path='/upload' element={<UploadPage />} /> */}
            {/* <Route path='/images' element={<ImagesPage />} /> */}
            <Route path='/account' element={<AccountPage />} />
            {/* <Route path='/message' element={<Message />} /> */}
            {/* <Route path='/message-panel' element={<MessagePanelPage />} /> */}
            {/* <Route path='/map' element={<EventsPage />} />
            <Route path='/map/:id' element={<MapPage />} />
            <Route path='/map/:id/form' element={<FormPage />} />
            <Route path='/map/:id/stampRally' element={<StampRallyPage />} />
            <Route path='/map/:id/place/:place_id' element={<PlacePage />} />
            <Route path='/user-management' element={<ManagePage />} />
            <Route path='/markdown' element={<MarkDownPage />} /> */}
            {/* <Route path='/links' element={<LinksPage />} /> */}
            {/* <Route path='/418' element={<TeapotPage />} /> */}
            {/* <Route path='*' element={<NotFoundPage />} /> */}
        </Routes>
    );
}
