import { useState } from 'react';
import {Header, Footer} from './layouts'
import './App.css';

function App() {
  const [cart, setCart] = useState([]);

  const handleSearch = (query) => {
    console.log("Buscando:", query);
  };

  return (
    <div className="app-container">
      <Header cartCount={cart.length} onSearch={handleSearch} />
      
      <main className="main-content">

        <h2>Bienvenido a ALMA</h2>
      </main>

      <Footer />
    </div>
  );
}

export default App;