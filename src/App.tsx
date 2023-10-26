import { Route, Routes } from 'react-router-dom';
import { ForDevelopers, Help, Home, Upload } from './pages';

export default function App() {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/for-developers' element={<ForDevelopers />} />
            <Route path='/help' element={<Help />} />
            <Route path='/upload' element={<Upload />} />
        </Routes>
    );
}
