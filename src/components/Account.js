import styles from './Account.module.css';
import { LuDollarSign , LuEuro, LuPoundSterling , LuJapaneseYen , LuIndianRupee , LuLayers , LuWallet , LuMail } from "react-icons/lu";
import { useState, useEffect } from 'react';

function Account(){
    const [email, setEmail] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState(0);
    const [subscriptions, setSubscriptions] = useState([]);
    const chooseCurr = (index) => {
        setSelectedCurrency(index);
    };

    useEffect(() => {
    const fetchUser = async () => {
        const token = localStorage.getItem("token");

        if (!token) return;

        try {
            const response = await fetch("http://localhost:5000/auth/me", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setEmail(data.email);
            }
        } catch (err) {
            console.error("Failed to fetch user:", err);
        }
    };

        fetchUser();
    }, []);

    useEffect(() => {
    const fetchSubscriptions = async () => {
        const token = localStorage.getItem("token");

        if (!token) return;

        try {
            const response = await fetch("http://localhost:5000/subscriptions", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (response.ok) {
                setSubscriptions(data);
            }
        } catch (err) {
            console.error(err);
        }
    };

        fetchSubscriptions();
    }, []);

    const totalNumber = subscriptions.length;

    const totalPrice = subscriptions.reduce(
        (sum, sub) => sum + Number(sub.price),
        0
    );

    return (<div className={styles.accountContainer}>
      <div className={styles.email}>
        <div className={styles.avatarRow}>
            <div className={styles.avatar}>
                {email ? email[0].toUpperCase() : ""}
            </div>
            <div>
            <h1><LuMail size={16} /> Email</h1>
            <p>{email}</p>
            </div>
        </div>
      </div>
      <div className={styles.subscriptions}>
        <h1>Subscriptions</h1>
        <div className={styles.statsRow}>
            <div className={styles.statCard}>
            <div className={styles.statIcon}><LuLayers size={22} /></div>
            <div className={styles.statValue}>{totalNumber}</div>
            <div className={styles.statLabel}>Active Subscriptions</div>
            </div>
            <div className={styles.statCard}>
            <div className={styles.statIcon}><LuWallet size={22} /></div>
            <div className={styles.statValue}>
                ${totalPrice.toFixed(2)}
            </div>
            <div className={styles.statLabel}>Total Monthly Spend</div>
            </div>
        </div>
        </div>
      <div className={styles.currency}>
        <h1>Preferred Currency:</h1>
        <div className={styles.chooseCurrency}>
            <div className={selectedCurrency === 0 ? styles.chosenDiv : styles.currencyDiv} onClick={() => chooseCurr(0)}>
        <LuDollarSign size={18} />
        <span className={styles.currencyLabel}>USD</span>
        </div>
        <div className={selectedCurrency === 1 ? styles.chosenDiv : styles.currencyDiv} onClick={() => chooseCurr(1)}>
        <LuEuro size={18} />
        <span className={styles.currencyLabel}>EUR</span>
        </div>
        <div className={selectedCurrency === 2 ? styles.chosenDiv : styles.currencyDiv} onClick={() => chooseCurr(2)}>
        <LuPoundSterling size={18} />
        <span className={styles.currencyLabel}>GBP</span>
        </div>
        <div className={selectedCurrency === 3 ? styles.chosenDiv : styles.currencyDiv} onClick={() => chooseCurr(3)}>
        <LuJapaneseYen size={18} />
        <span className={styles.currencyLabel}>JPY</span>
        </div>
        <div className={selectedCurrency === 4 ? styles.chosenDiv : styles.currencyDiv} onClick={() => chooseCurr(4)}>
        <LuIndianRupee size={18} />
        <span className={styles.currencyLabel}>INR</span>
        </div>
        <button>Save</button></div>
        </div>
        <div className={styles.deleteSection}>
        <h1>Delete Account</h1>
        <button className={styles.deleteBtn}>Delete</button>
        </div>
    </div>)
}

export default Account;