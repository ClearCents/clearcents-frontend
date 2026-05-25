import { useState, useEffect } from 'react';

function Dashboard({ token }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h2>My Subscriptions</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        subscriptions.map(sub => (
          <div key={sub.id}>
            <h3>{sub.name}</h3>
            <p>${sub.price}/month</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;