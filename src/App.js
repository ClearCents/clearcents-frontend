import { BrowserRouter, Routes, Route, Navigate, NavLink } from 'react-router-dom';
import { useState } from 'react';
import Dashboard from './components/Dashboard';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Support from './components/Support';
import Help from './components/Help';
import Licensing from './components/Licensing';
import Account from './components/Account';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  const handleSignin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleSignout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiry');
    setToken(null);
  };

  return (
    <BrowserRouter>
        <div className="App">
            {token ? (
          <nav className="navbar">
            <div className="nav-brand">ClearCents</div>
            <div className="nav-tabs">
              <NavLink to="/" end className={({ isActive }) => isActive ? 'tab active' : 'tab'}>
                Dashboard
              </NavLink>
              <NavLink to="/insights" className={({ isActive }) => isActive ? 'tab active' : 'tab'}>
                Insights
              </NavLink>
              <NavLink to="/account" className={({ isActive }) => isActive ? 'tab active' : 'tab'}>
                Account
              </NavLink>
            </div>
            <button className="signout-btn" onClick={handleSignout}>Sign out</button>
          </nav>
        ) : (
          <nav className="navbar">
            <NavLink to="/signin" className="nav-brand-link">
              <div className="nav-brand">ClearCents</div>
            </NavLink>
            <div className="nav-tabs">
              <NavLink to="/signin" className={({ isActive }) => isActive ? 'tab active' : 'tab'}>
                Sign in
              </NavLink>
              <NavLink to="/signup" className={({ isActive }) => isActive ? 'tab active' : 'tab'}>
                Sign up
              </NavLink>
            </div>
          </nav>
        )}

        <div className={token ? 'content' : 'signin-wrapper'}>

          <Routes>
            <Route path="/" element={token ? <Dashboard token={token} /> : <Navigate to="/signin" />} />
            <Route path="/insights" element={token ? <div><h2>Insights coming soon</h2></div> : <Navigate to="/signin" />} />
            <Route path="/account" element={<Account />} />
            <Route path="/signin" element={token ? <Navigate to="/" /> : <Signin onSignin={handleSignin} />} />
            <Route path="/signup" element={token ? <Navigate to="/" /> : <Signup onSignup={handleSignin} />} />
            <Route path="/support" element={<Support />} />
            <Route path="/help" element={<Help />} />
            <Route path="/licensing" element={<Licensing />} />
            
          </Routes>
        </div>

        <footer className="footer">
          <div className="footer-links">
            <a href="/support">Support</a>
            <a href="/help">Help</a>
            <a href="/licensing">Licensing</a>
          </div>
          <p className="footer-copy">© 2026 ClearCents. All rights reserved.</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;