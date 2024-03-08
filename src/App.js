
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from "./components/Login";
import NavBar from "./components/NavBar";
import Signup from './components/Signup';
import Profile from './components/Profile';
import SingleContent from './components/singleContent';
import MovieDetails from './components/MovieDetails';
import Home from './components/Home';
import Favourite from './components/Favourite';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/navbar" element={<NavBar/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/favourite" element={<Favourite/>}/>
        <Route path="/singlecontent" element={<SingleContent/>}/>
        <Route path="/moviedetails/:id" element={<MovieDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
