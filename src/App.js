import './App.css';
import Dashboard from './components/Dashboard';
import { useState } from 'react';
import Login from './components/Login';


function App() {
  const storedToken = localStorage.getItem('token');
  const storedExpiry = localStorage.getItem('token_expiry');
  const isValid = storedExpiry && Date.now() < parseInt(storedExpiry);
  const [token, setToken] = useState(isValid ? storedToken : null);
  const handleLogin = (newToken) => {
  const expiry = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
  localStorage.setItem('token', newToken);
  localStorage.setItem('token_expiry', expiry);
  setToken(newToken);
  }
  return (
    <div className="App">
      <h1>ClearCents</h1>
      <p>Know what you pay. Own what you use.</p>
      {token ? (
        <Dashboard token={token} />
      ) : (
        <Login onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;