import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

const currencySymbols = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', INR: '₹' };

function Dashboard({ token }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [startDate, setStartDate] = useState('');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/subscriptions', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (res.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('token_expiry');
          window.location.href = '/signin';
          return null;
        }
        return res.json();
      })
      .then(data => {
        if (!data) return;
        setSubscriptions(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch subscriptions:', err);
        setLoading(false);
      });
  }, [token]);
  
  const handleAdd = () => {
    fetch('http://localhost:5000/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, price: parseFloat(price), usage_hours: 0, is_active: true, billing_cycle: billingCycle, start_date: startDate })
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data[0]) {
          setSubscriptions(prev => [...prev, data[0]]);
          setName('');
          setPrice('');
          setShowForm(false);
        } else {
          console.error('Add subscription failed:', data);
        }
      })
      .catch(err => {
        console.error('Network error adding subscription:', err);
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/subscriptions/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => {
        setSubscriptions(prev => prev.filter(sub => sub.id !== id));
      })
      .catch(err => {
        console.error('Failed to delete subscription:', err);
      });
  };

  const getDaysUntilRenewal = (startDate, billingCycle) => {
  if (!startDate) return null;
  
  const start = new Date(startDate);
  const today = new Date();
  
  let nextRenewal = new Date(start);
  
  while (nextRenewal <= today) {
    if (billingCycle === 'monthly') {
      nextRenewal.setMonth(nextRenewal.getMonth() + 1);
    } else if (billingCycle === 'yearly') {
      nextRenewal.setFullYear(nextRenewal.getFullYear() + 1);
    } else if (billingCycle === 'weekly') {
      nextRenewal.setDate(nextRenewal.getDate() + 7);
    }
  }
  
  const diff = Math.ceil((nextRenewal - today) / (1000 * 60 * 60 * 24));
  return diff;
};

  return (
    <div>
      <div className={styles.dashboard}>
        <div className={styles.dashboardHeader}>
          <h2>My Subscriptions</h2>
          <button className={styles.addIconBtn} onClick={() => setShowForm(true)}>+</button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          subscriptions.map(sub => (
            <div key={sub.id} className={styles.subscriptionCard}>
              <h3>{sub.name}</h3>
              <p>{currencySymbols[sub.currency] || sub.currency}{sub.price}/month</p>
              {sub.start_date && (
                <p className={styles.renewalDate}>
                  Renews in {getDaysUntilRenewal(sub.start_date, sub.billing_cycle)} days
               </p> 
              )}
              <button className={styles.deleteBtn} onClick={() => handleDelete(sub.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
      {showForm && (
  <div className={styles.modalOverlay} onClick={() => setShowForm(false)}>
    <div className={styles.modal} onClick={e => e.stopPropagation()}>
      <div className={styles.modalHeader}>
        <h3>Add Subscription</h3>
        <button className={styles.modalClose} onClick={() => setShowForm(false)}>✕</button>
      </div>
      <input type="text" placeholder="Subscription name" value={name} onChange={e => setName(e.target.value)} className={styles.modalInput} />
<input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} className={styles.modalInput} />
<select value={billingCycle} onChange={e => setBillingCycle(e.target.value)} className={styles.modalInput}>
  <option value="monthly">Monthly</option>
  <option value="yearly">Yearly</option>
  <option value="weekly">Weekly</option>
</select>
<input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className={styles.modalInput} />
<button className={styles.addBtn} onClick={handleAdd}>Add Subscription</button>
    </div>
  </div>
)}
    </div>
  );
}

export default Dashboard;