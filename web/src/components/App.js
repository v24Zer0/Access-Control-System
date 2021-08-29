import './App.css';
import React, { useState } from 'react';
import Login from './login/login';
import TopBar from './TopBar/TopBar';
import Home from './home/home';

/**
 * Decide page to view
 * Either login or home
 */

function App() {  
  const [user, setUser] = useState(false);

  return (
    <div>
      <TopBar />
      {user ? <Home updateUser={setUser}/> : <Login updateUser={setUser}/>}
    </div>
  );
}

export default App;
