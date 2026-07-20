import { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';

const currencyList = ['USD', 'EUR', 'GBP', 'JPY', 'INR'];

const currencySymbols = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  JPY: '¥',
  INR: '₹'
};

function Dashboard({ token }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [billingCycle, setBillingCycle] = useState('monthly');
  const [startDate, setStartDate] = useState('');

  const [showForm, setShowForm] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(0);

  const chooseCurr = (index) => {
    setSelectedCurrency(index);
  };

  useEffect(() => {
    fetch('http://localhost:5000/subscriptions', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        if (res.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('token_expiry');
          window.location.href = '/signin';
          return null;
        }

        return res.json();
      })
      .then((data) => {
        if (!data) return;

        setSubscriptions(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [token]);

  const handleAdd = () => {
    fetch('http://localhost:5000/subscriptions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name,
        price: parseFloat(price),
        usage_hours: 0,
        is_active: true,
        billing_cycle: billingCycle,
        start_date: startDate,
        currency: currencyList[selectedCurrency]
      })
    })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data[0]) {
          setSubscriptions((prev) => [...prev, data[0]]);
          setName('');
          setPrice('');
          setBillingCycle('monthly');
          setStartDate('');
          setSelectedCurrency(0);
          setShowForm(false);
        }
      })
      .catch(console.error);
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/subscriptions/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(() => {
      setSubscriptions((prev) => prev.filter((sub) => sub.id !== id));
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

    return Math.ceil((nextRenewal - today) / (1000 * 60 * 60 * 24));
  };

  const getCycleText = (cycle) => {
    if (cycle === 'monthly') return 'Monthly';
    if (cycle === 'yearly') return 'Yearly';
    return 'Weekly';
  };

    return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.dashboardHeader}>
          <div>
            <h2>My Subscriptions</h2>
            <p className={styles.subtitle}>
              {subscriptions.length} subscription{subscriptions.length !== 1 ? 's' : ''}
            </p>
          </div>

          <button
            className={styles.addIconBtn}
            onClick={() => setShowForm(true)}
          >
            +
          </button>
        </div>

        {loading ? (
          <p>Loading...</p>
        ) : subscriptions.length === 0 ? (
          <div className={styles.emptyState}>
            <h3>No subscriptions yet</h3>
            <p>Click the + button to add your first subscription.</p>
          </div>
        ) : (<div className={styles.subscriptionList}>
  {subscriptions.map((sub) => (
    <div key={sub.id} className={styles.subscriptionRow}>

      <div className={styles.subscriptionInfo}>
        <h3>{sub.name}</h3>

        <div className={styles.subscriptionMeta}>
          <span className={styles.billingBadge}>
            {getCycleText(sub.billing_cycle)}
          </span>

          {sub.start_date && (
            <span className={styles.renewalText}>
              Renews in {getDaysUntilRenewal(
                sub.start_date,
                sub.billing_cycle
              )} days
            </span>
          )}
        </div>
      </div>


      <div className={styles.subscriptionPrice}>
        <strong>
          {currencySymbols[sub.currency] || sub.currency}
          {sub.price}
        </strong>

        <span>
          /{sub.billing_cycle === "yearly"
            ? "yr"
            : sub.billing_cycle === "weekly"
            ? "wk"
            : "mo"}
        </span>
      </div>


      <button
        className={styles.deleteBtn}
        onClick={() => handleDelete(sub.id)}
      >
        Delete
      </button>

    </div>
  ))}
</div>
        )}
      </div>

      {showForm && (
        <div
          className={styles.modalOverlay}
          onClick={() => setShowForm(false)}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.modalHeader}>
              <h3>Add Subscription</h3>

              <button
                className={styles.modalClose}
                onClick={() => setShowForm(false)}
              >
                ✕
              </button>
            </div>

            <input
              type="text"
              placeholder="Subscription name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={styles.modalInput}
            />

            <div className={styles.priceRow}>

              <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className={styles.modalInput}
              />

              <div className={styles.currencyPicker}>
                {currencyList.map((code, index) => (
                  <button
                    key={code}
                    type="button"
                    onClick={() => chooseCurr(index)}
                    className={
                      selectedCurrency === index
                        ? styles.currencyPillActive
                        : styles.currencyPill
                    }
                  >
                    {currencySymbols[code]}
                  </button>
                ))}
              </div>

            </div>

            <select
              value={billingCycle}
              onChange={(e) => setBillingCycle(e.target.value)}
              className={styles.modalInput}
            >
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
              <option value="weekly">Weekly</option>
            </select>

            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className={styles.modalInput}
            />

            <button
              className={styles.addBtn}
              onClick={handleAdd}
            >
              Add Subscription
            </button>

          </div>
        </div>
      )}
    </>
  );
}

export default Dashboard;