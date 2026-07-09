import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

function Dashboard({ token }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/subscriptions', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setSubscriptions(Array.isArray(data) ? data : []);
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
      body: JSON.stringify({ name, price: parseFloat(price), usage_hours: 0, is_active: true })
    })
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data[0]) {
        setSubscriptions(prev => [...prev, data[0]]);
        setName('');
        setPrice('');
      } else {
        console.error('Add subscription failed:', data);
      }
      });
  };

  const handleDelete = (id) => {
  fetch(`http://localhost:5000/subscriptions/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(() => {
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    });
};

  return (
    <div>
      <div className={styles.dashboard}>
        <h2>My Subscriptions</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          subscriptions.map(sub => (
            <div key={sub.id} className={styles.subscriptionCard}>
              <h3>{sub.name}</h3>
              <p>${sub.price}/month</p>
              <button className={styles.deleteBtn} onClick={() => handleDelete(sub.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
      <div className={styles.addForm}>
        <input
          type="text"
          placeholder="Subscription name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={e => setPrice(e.target.value)}
        />
        <button onClick={handleAdd}>Add Subscription</button>
      </div>
    </div>
  );
}

export default Dashboard;