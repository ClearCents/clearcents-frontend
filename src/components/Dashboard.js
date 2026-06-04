import { useState, useEffect } from 'react';
import './Dashboard.css';

function Dashboard({ token }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  useEffect(() => {
    fetch('http://localhost:3000/subscriptions', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setSubscriptions(data);
        setLoading(false);
      });
  }, [token]);

  const handleAdd = () => {
    fetch('http://localhost:3000/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ name, price: parseFloat(price), usage_hours: 0, is_active: true })
    })
      .then(res => res.json())
      .then(data => {
        setSubscriptions([...subscriptions, data[0]]);
        setName('');
        setPrice('');
      });
  };

  const handleDelete = (id) => {
  fetch(`http://localhost:3000/subscriptions/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(() => {
      setSubscriptions(subscriptions.filter(sub => sub.id !== id));
    });
};

  return (
    <div>
      <div className="dashboard">
        <h2>My Subscriptions</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          subscriptions.map(sub => (
            <div key={sub.id} className="subscription-card">
              <h3>{sub.name}</h3>
              <p>${sub.price}/month</p>
              <button className="delete-btn" onClick={() => handleDelete(sub.id)}>Delete</button>
            </div>
          ))
        )}
      </div>
      <div className="add-form">
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