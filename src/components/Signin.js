import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import styles from './Signin.module.css';
import { LuEye, LuEyeOff } from 'react-icons/lu';

function Signin({ onSignin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignin = () => {
    if(!email || !password){
      setError('Please enter your email and password.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    setError('Please enter a valid email address.');
    return;
  }
    setError('');
    fetch('https://clearcents-backend.onrender.com/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          onSignin(data.token);
          navigate('/');
        } else {
          setError(data.error || 'Signin failed.');
        }
      }
    )
    .catch(() => {
    setError('Cannot connect to server.');
  });
  };

  return (
    <div className={styles.signinContainer}>
      <h2>Sign in to ClearCents</h2>
      <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={e => setEmail(e.target.value)}
      autoComplete="email"
    />

      <br />
      <div className={styles.passwordWrapper}><input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="current-password"
      />
      <button type="button" className={styles.togglePassword} onClick={() => setShowPassword(prev => !prev)}>
        {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
</button>
      </div>
      <button onClick={handleSignin}>Sign in</button>
      <p className={styles.authRedirect}>
  Don't have an account? <Link to="/signup">Sign up</Link>   
</p>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Signin;