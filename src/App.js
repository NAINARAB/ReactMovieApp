import './App.css'; 
import Login from './comp/login';
import Home from './comp/home';
import Movie from './comp/playmovie';

import { BrowserRouter, Routes, Route } from "react-router-dom";


function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/movie/:id' element={<Movie />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
