import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Register';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                {/* <Route path="/movies" element={<Movies />} />
                <Route path='/tv_shows' element={<Tvshow />} /> */}
            </Routes>
        </BrowserRouter>
    );
}

export default App;