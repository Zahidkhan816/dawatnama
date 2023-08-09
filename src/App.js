import './App.css';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Form from './Components/Form';
import { Routes, Route } from 'react-router';
import MeraigeHall from './Components/MeraigeHall';
import Foods from './Components/Foods';
import Photography from './Components/Photography';
import CompareService from './Components/CompareService';
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='home' element={<Home />} />
        <Route path="/form" element={<Form/>} />
        <Route path='MeraigHall' element={<MeraigeHall />} />
        <Route path='Food' element={<Foods />} />
        <Route path='Photography' element={<Photography />} />
        <Route path='Compare' element={<CompareService/>}/>
      </Routes>
    </div>

  );
}

export default App;
