import React, { useState } from 'react';
import DishList from './components/DishList';
import AddDishForm from './components/AddDishForm';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleDishAdded = () => {
    // Force refresh of dish list by updating the key
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="App">
      <div className="container">
        <header className="header">
          <h1>Surabi's Kitchen</h1>
          <p></p>
        </header>

        <main>
          <AddDishForm onDishAdded={handleDishAdded} />
          <DishList key={refreshKey} />
        </main>

        <footer style={{ 
          textAlign: 'center', 
          marginTop: '40px', 
          color: 'white', 
          opacity: 0.8 
        }}>
          <p>Powered by Google Sheets API</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
