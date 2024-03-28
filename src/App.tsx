import { Route, Routes } from 'react-router-dom';
import {
    AccountPage,
    ImagesPage,
    AnalyticsPage,
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
} from './pages';

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/for-developers' element={<DevelopersPage />} />
            <Route path='/help' element={<HelpPage />} />
            <Route path='/upload' element={<UploadPage />} />
            <Route path='/images' element={<ImagesPage />} />
            <Route path='/account' element={<AccountPage />} />
            {/* <Route path='/message' element={<Message />} /> */}
            <Route path='/analytics' element={<AnalyticsPage />} />
            <Route path='/map' element={<EventsPage />} />
            <Route path='/map/:id' element={<MapPage />} />
            <Route path='/map/:id/form' element={<FormPage />} />
            <Route path='/map/:id/place/:place_id' element={<PlacePage />} />
            <Route path='/user-management' element={<ManagePage />} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    );
}
