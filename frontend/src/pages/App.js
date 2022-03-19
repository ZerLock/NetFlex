import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Register';
import Movies from './Movies';
import Tvshow from './Tvshow';
import Landing from './Landing';
import Moviepage from './Moviepage';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/movies" element={<Movies />} />
                <Route path='/tvshows' element={<Tvshow />} />
                <Route path='/movie/:id' element={<Moviepage />} />
                <Route path='/landing' element={<Landing />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;