import React from 'react'
import Home from './components/Home'
import Seller from './components/Seller'
import Buyer from './components/Buyer'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

function App() {
return (
	<>
	<BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/buyer" element={<Buyer/>} />
      <Route path="/seller" element={<Seller/>} />
    </Routes>
	</BrowserRouter>
	</>
);
}

export default App;