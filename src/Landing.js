import { useNavigate } from 'react-router-dom';
import './Landing.css';

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="landing">

      {/* Navbar */}
      <nav className="landing-nav">
        <div className="landing-brand">ClearCents</div>
        <div className="landing-nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How it works</a>
        </div>
        <div className="landing-nav-buttons">
          <button className="nav-login" onClick={() => navigate('/signin')}>Log in</button>
          <button className="nav-signup" onClick={() => navigate('/signup')}>Sign up</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero-left">
          <h1>Take control of your subscriptions</h1>
          <p>ClearCents finds every subscription you're paying for, shows you what you're wasting, and helps you cancel what you don't need.</p>
          <div className="hero-buttons">
            <button className="hero-btn-primary" onClick={() => navigate('/signup')}>Get started free</button>
            <button className="hero-btn-secondary" onClick={() => navigate('/signin')}>Log in</button>
          </div>
        </div>
        <div className="hero-right">
          <div className="mockup-card">
            <p className="mockup-title">My Subscriptions</p>
            <div className="mockup-item">
              <span>Netflix</span>
              <span className="mockup-price">$15.99/mo</span>
            </div>
            <div className="mockup-item">
              <span>Spotify</span>
              <span className="mockup-price">$9.99/mo</span>
            </div>
            <div className="mockup-item warn">
              <span>Adobe Creative</span>
              <span className="mockup-price">$54.99/mo</span>
            </div>
            <div className="mockup-item danger">
              <span>Duolingo Plus</span>
              <span className="mockup-price">$6.99/mo</span>
            </div>
            <div className="mockup-total">
              <span>Wasted this month</span>
              <span className="mockup-waste">$61.98</span>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="problem">
        <div className="problem-content">
          <h2>The average person wastes <span>$300+ per year</span> on subscriptions they forgot about.</h2>
          <p>You signed up. You forgot. They kept charging. Sound familiar?</p>
          <div className="stats">
            <div className="stat">
              <h3>68%</h3>
              <p>of people have been charged for something they forgot about</p>
            </div>
            <div className="stat">
              <h3>75%</h3>
              <p>would want a warning before a subscription renews</p>
            </div>
            <div className="stat">
              <h3>$300+</h3>
              <p>wasted per year on average per person</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="feature-row">
          <div className="feature-text">
            <h2>Find every subscription you're paying for</h2>
            <p>Connect your Gmail and ClearCents automatically scans your inbox to find every subscription — including ones you forgot about years ago.</p>
            <button className="feature-btn" onClick={() => navigate('/signup')}>Get started</button>
          </div>
          <div className="feature-mockup">
            <div className="mockup-card">
              <p className="mockup-title">Found for you</p>
              <div className="mockup-item"><span>🎵 Spotify</span><span className="mockup-price">$9.99/mo</span></div>
              <div className="mockup-item"><span>📺 Netflix</span><span className="mockup-price">$15.99/mo</span></div>
              <div className="mockup-item danger"><span>🎨 Adobe</span><span className="mockup-price">$54.99/mo</span></div>
            </div>
          </div>
        </div>

        <div className="feature-row reverse">
          <div className="feature-text">
            <h2>See exactly what you waste</h2>
            <p>Every subscription gets a waste score based on how much you use it. Stop paying for services you opened once and never went back to.</p>
            <button className="feature-btn" onClick={() => navigate('/signup')}>See your waste score</button>
          </div>
          <div className="feature-mockup">
            <div className="mockup-card">
              <p className="mockup-title">Waste Score</p>
              <div className="mockup-item"><span>Netflix</span><span style={{color:'#22c55e', fontWeight:700}}>Low ✓</span></div>
              <div className="mockup-item"><span>Adobe Creative</span><span style={{color:'#f59e0b', fontWeight:700}}>Medium ⚠️</span></div>
              <div className="mockup-item"><span>Duolingo Plus</span><span style={{color:'#ef4444', fontWeight:700}}>High 🔴</span></div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="how-it-works" id="how-it-works">
        <h2>How it works</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Sign up free</h3>
            <p>Create your account in under 2 minutes. No credit card required.</p>
          </div>
          <div className="step-divider">→</div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>Connect Gmail</h3>
            <p>We scan your inbox and find every subscription automatically.</p>
          </div>
          <div className="step-divider">→</div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Cut what you waste</h3>
            <p>See your waste score and cancel unused subscriptions instantly.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <h2>Ready to stop wasting money?</h2>
        <p>Join people who found subscriptions they didn't know they were paying for.</p>
        <button className="cta-btn" onClick={() => navigate('/signup')}>Sign up free</button>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="footer-top">
          <div className="footer-brand">ClearCents</div>
          <div className="footer-links">
            <a href="/support">Support</a>
            <a href="/help">Help</a>
            <a href="/licensing">Licensing</a>
          </div>
        </div>
        <p className="footer-copy">© 2026 ClearCents. All rights reserved.</p>
      </footer>

    </div>
  );
}

export default Landing;