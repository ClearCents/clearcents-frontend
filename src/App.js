import './App.css';
import Dashboard from './components/Dashboard';
import { useState } from 'react';
import Login from './components/Login';


function App() {
  const [token, setToken] = useState(null);
  return (
    <div className="App">
      <h1>ClearCents</h1>
      <p>Know what you pay. Own what you use.</p>
      {token ? (
        <Dashboard token={token} />
      ) : (
        <Login onLogin={setToken} />
      )}
    </div>
  );
}

export default App;