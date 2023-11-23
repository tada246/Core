import { Route, Routes } from 'react-router-dom';
import { Account, AllImages, ForDevelopers, Help, Home, MapDetail, Maps, NotFound, Upload } from './pages';

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/for-developers' element={<ForDevelopers />} />
            <Route path='/help' element={<Help />} />
            <Route path='/upload' element={<Upload />} />
            <Route path='/images' element={<AllImages />} />
            <Route path='/account' element={<Account />} />
            <Route path='/map' element={<Maps />} />
            <Route path='/map/:id' element={<MapDetail />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}
