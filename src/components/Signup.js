import { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import styles from './Signup.module.css';
import { LuEye, LuEyeOff, LuMail } from 'react-icons/lu';

function Signup({ onSignup }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [step, setStep] = useState('signup'); // 'signup' | 'verify'
  const [code, setCode] = useState('');
  const [verifying, setVerifying] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  const handleSignup = () => {
    if (!email || !password || !confirmPassword) {
      setError('Please enter your email and password.');
      return;
    }
    if (password.length < 8) {
      setError('Password should be at least 8 characters long');
      return;
    }
    if (password !== confirmPassword) {
      setError('Your passwords do not match.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('Please enter a valid email address.');
      return;
    }
    setError('');

    fetch('https://clearcents-backend.onrender.com/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (ok && data.needsVerification) {
          setStep('verify');
        } else {
          setError(data?.error || "Something went wrong. Please try again.");
        }
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      });
  };

  const handleVerify = () => {
    if (!code || code.trim().length === 0) {
      setError('Please enter the verification code.');
      return;
    }
    setError('');
    setVerifying(true);

    fetch('https://clearcents-backend.onrender.com/auth/verify-signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token: code.trim() })
    })
      .then(res => res.json().then(data => ({ ok: res.ok, data })))
      .then(({ ok, data }) => {
        if (ok && data.token) {
          onSignup(data.token);
          navigate("/");
        } else {
          setError(data?.error || "Invalid or expired code. Please try again.");
        }
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      })
      .finally(() => setVerifying(false));
  };

  const handleResend = () => {
    setResending(true);
    setResendMessage('');
    fetch('https://clearcents-backend.onrender.com/auth/resend-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    })
      .then(res => res.json())
      .then(() => setResendMessage('A new code has been sent.'))
      .catch(() => setResendMessage('Failed to resend code.'))
      .finally(() => setResending(false));
  };

  if (step === 'verify') {
    return (
      <div className={styles.signupContainer}>
        <div className={styles.verifyIcon}>
          <LuMail size={28} />
        </div>
        <h2>Check your email</h2>
        <p className={styles.intro}>
          We sent a 8-digit code to <strong>{email}</strong>
        </p>

        <input
          type="text"
          inputMode="numeric"
          placeholder="00000000"
          value={code}
          onChange={e => setCode(e.target.value.replace(/\D/g, '').slice(0, 8))}
          maxLength={8}
          className={styles.codeInput}
        />

        <button onClick={handleVerify} disabled={verifying}>
          {verifying ? 'Verifying...' : 'Verify email'}
        </button>

        <p className={styles.resendRow}>
          Didn't get a code?{' '}
          <button type="button" className={styles.linkBtn} onClick={handleResend} disabled={resending}>
            {resending ? 'Sending...' : 'Resend'}
          </button>
        </p>

        {resendMessage && <p className={styles.resendMessage}>{resendMessage}</p>}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    );
}

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
      <div className={styles.passwordWrapper}>
        <input
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
      <div className={styles.passwordWrapper}>
        <input
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