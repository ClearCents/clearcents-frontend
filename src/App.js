import { BrowserRouter, Routes, Route, Navigate, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Support from './components/Support';
import Help from './components/Help';
import Licensing from './components/Licensing';
import Account from './components/Account';
import Landing from './Landing';
import './App.css';

function AppContent() {
  const storedToken = localStorage.getItem('token');
  const storedExpiry = localStorage.getItem('token_expiry');
  const isValid = storedExpiry && Date.now() < parseInt(storedExpiry);
  const [token, setToken] = useState(isValid ? storedToken : null);
  const location = useLocation();
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || "light");

 const handleSignin = (newToken) => {
    const expiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours
    localStorage.setItem('token', newToken);
    localStorage.setItem('token_expiry', expiry);
    setToken(newToken);
  };

  const handleSignout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiry');
    setToken(null);
  };

  const isAuthPage = location.pathname === '/signin' || location.pathname === '/signup';

  useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

  return (
    <div className="App">
      {token ? (
        <nav className="navbar">
          <NavLink to="/landing" className="nav-brand">ClearCents</NavLink>
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
        isAuthPage && (
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
        )
      )}

      <div className={token ? 'content' : 'auth-wrapper'}>
        <Routes>
          <Route path="/" element={token ? <Dashboard token={token} /> : <Navigate to="/landing" />} />
          <Route path="/insights" element={token ? <div><h2>Insights coming soon</h2></div> : <Navigate to="/landing" />} />
          <Route path="/account" element={token ? <Account token={token} theme={theme} setTheme={setTheme} /> : <Navigate to="/landing" />}/>
          <Route path="/landing" element={<Landing />} />
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
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;