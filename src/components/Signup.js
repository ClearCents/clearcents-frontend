import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import styles from './Signup.module.css';
import { LuEye, LuEyeOff } from 'react-icons/lu';

function Signup({ onSignup }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = () => {
    if(!email || !password || !confirmPassword){
      setError('Please enter your email and password.');
      return;
    }
    if(password.length<8){
      setError('Password should be at least 8 characters long');
      return;
    }
    if(password!==confirmPassword){
      setError('Your passwords do not match.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    setError('Please enter a valid email address.');
    return;
  }
    setError('');
    fetch('http://localhost:5000/auth/signup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
})
    .then(res => res.json().then(data => ({ ok: res.ok, data })))
  .then(({ ok, data }) => {
    if (ok && data.token) {
      onSignup(data.token);
      navigate("/");
    } else {
      setError(data?.error || "Please confirm your email or try signing in.");
    }
  })
  .catch(() => {
    setError("Something went wrong. Please try again.");
  });
  };

  return (
    <div className={styles.signupContainer}>
      <h2>Sign up to ClearCents</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <br />
      <div className={styles.passwordWrapper}><input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        autoComplete="new-password"
      />
      <button type="button" className={styles.togglePassword} onClick={() => setShowPassword(prev => !prev)}>
        {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
</button>
      </div>
      <div className={styles.passwordWrapper}><input
        type={showPassword ? "text" : "password"}
        placeholder="Confirm password"
        value={confirmPassword}
        onChange={e => setConfirmPassword(e.target.value)}
        autoComplete="new-password"
      />
      <button type="button" className={styles.togglePassword} onClick={() => setShowPassword(prev => !prev)}>
        {showPassword ? <LuEyeOff size={20} /> : <LuEye size={20} />}
</button>
      </div>
      <button onClick={handleSignup}>Sign up</button>
      <p className={styles.authRedirect}>
  Already have an account? <Link to="/signin">Sign in</Link>
</p>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}

export default Signup;