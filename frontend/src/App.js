import './App.css';
import Home from './components/Home.js';
import Albums from './components/Albums.js';
import { Routes, Route } from "react-router-dom";
import TopSongChart from './components/TopSongChart';


function App() {
  return (
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path='Home' element={<Home />}/>
        <Route path="Albums" element={<Albums />} />
        <Route path="Top" element={<TopSongChart />} />
        {/* <Route path="*" element={<NoPage />} /> */}
      </Routes>
  );
}

export default App;
