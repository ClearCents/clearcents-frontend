import styles from './Account.module.css';
import { LuTriangleAlert, LuDollarSign, LuEuro, LuPoundSterling, LuJapaneseYen, LuIndianRupee, LuLayers, LuWallet, LuMail, LuCheck, LuSun, LuMoon } from "react-icons/lu";
import { useState, useEffect } from 'react';

const currencySymbols = { USD: '$', EUR: '€', GBP: '£', JPY: '¥', INR: '₹' };

function Account({ token, theme, setTheme }) {
    const [email, setEmail] = useState("");
    const [createdAt, setCreatedAt] = useState("");
    const [subscriptions, setSubscriptions] = useState([]);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [deleteError, setDeleteError] = useState("");

    // Fetch user's email
    useEffect(() => {
        if (!token) return;
        fetch("http://localhost:5000/auth/me", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => {
                setEmail(data.email);
                setCreatedAt(data.created_at);
            })
            
            .catch(err => console.error("Failed to fetch user:", err));
    }, [token]);

    // Fetch subscriptions
    useEffect(() => {
        if (!token) return;
        fetch("http://localhost:5000/subscriptions", {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => res.json())
            .then(data => setSubscriptions(Array.isArray(data) ? data : []))
            .catch(err => console.error("Failed to fetch subscriptions:", err));
    }, [token]);

    const totalNumber = subscriptions.length;

    // Group totals by each subscription's own currency (Option A)
    const totalsByCurrency = subscriptions.reduce((acc, sub) => {
        const cur = sub.currency || 'USD';
        acc[cur] = (acc[cur] || 0) + Number(sub.price);
        return acc;
    }, {});

    const formattedDate = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric"
    })
    : "";

    const averageByCurrency = subscriptions.reduce((acc, sub) => {
    const cur = sub.currency || 'USD';

    if (!acc[cur]) {
        acc[cur] = {
            total: 0,
            count: 0
        };
    }

    acc[cur].total += Number(sub.price);
    acc[cur].count++;

    return acc;
}, {});

    const handleDeleteAccount = async () => {
    setDeleting(true);
    setDeleteError("");

    try {
        const res = await fetch("http://localhost:5000/auth/delete-account", {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const data = await res.json();

        if (!res.ok) {
            throw new Error(data.error || "Failed to delete account");
        }

        // Remove saved login
        localStorage.removeItem("token");

        window.location.href = "/signin";

    } catch (err) {
        console.error(err);
        setDeleteError(err.message);
        setDeleting(false);
    }
};

    return (
        <div className={styles.accountContainer}>
            <div className={styles.email}>
                <div className={styles.avatarRow}>
                    <div className={styles.avatar}>
                        {email ? email[0].toUpperCase() : ""}
                    </div>
                    <div>
                    <h1><LuMail size={16} /> Email</h1>
                    <p>{email}</p>

                    {formattedDate && (
                        <p>
                            Joined {formattedDate}
                        </p>
                    )}
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
                            {Object.keys(totalsByCurrency).length === 0 ? (
                                <span>{currencySymbols['USD']}0.00</span>
                            ) : (
                                Object.entries(totalsByCurrency).map(([cur, total]) => (
                                    <div key={cur}>
                                        {currencySymbols[cur] || cur}{total.toFixed(2)}
                                    </div>
                                ))
                            )}
                        </div>
                        <div className={styles.statLabel}>Total Monthly Spend</div>
                    </div>
                    <div className={styles.statCard}>
                    <div className={styles.statIcon}>
                        <LuWallet size={22} />
                    </div>
                    <div className={styles.statValue}>
                        {Object.keys(averageByCurrency).length === 0 ? (
                            <span>$0.00</span>
                        ) : (
                            Object.entries(averageByCurrency).map(([cur, data]) => (
                                <div key={cur}>
                                    {currencySymbols[cur] || cur}
                                    {(data.total / data.count).toFixed(2)}
                                </div>
                            ))
                        )}
                    </div>
            <div className={styles.statLabel}>
                Average Subscription Cost
            </div>
        </div>
                </div>
            </div>
            
            <div className={styles.appearance}>
        <h1>Appearance</h1>
        <div className={styles.themeGrid}>
            <div
            className={theme === "light" ? styles.themeCardActive : styles.themeCard}
            onClick={() => setTheme("light")}
        >
            <div className={styles.themePreviewLight}>
                <div className={styles.previewTopRow}>
                    <div className={styles.previewDot} />
                    <LuSun size={18} className={styles.previewModeIcon} />
                </div>
                <div className={styles.previewLineShort} />
                <div className={styles.previewLineLong} />
            </div>
            <div className={styles.themeCardFooter}>
                <span>Light</span>
                {theme === "light" && <LuCheck size={16} />}
            </div>
        </div>

        <div
            className={theme === "dark" ? styles.themeCardActive : styles.themeCard}
            onClick={() => setTheme("dark")}
        >
            <div className={styles.themePreviewDark}>
                <div className={styles.previewTopRow}>
                    <div className={styles.previewDot} />
                    <LuMoon size={18} className={styles.previewModeIcon} />
                </div>
                <div className={styles.previewLineShort} />
                <div className={styles.previewLineLong} />
            </div>
            <div className={styles.themeCardFooter}>
                <span>Dark</span>
                {theme === "dark" && <LuCheck size={16} />}
            </div>
        </div>
    </div>
</div>
            <div className={styles.deleteSection}>
                <h1>Delete Account</h1>
                <button className={styles.deleteBtn} onClick={() => setShowDeleteModal(true)}>Delete</button>
            </div>
            {showDeleteModal && (
            <div className={styles.modalOverlay} onClick={() => setShowDeleteModal(false)}>
                <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                    <div className={styles.modalIcon}>
                        <LuTriangleAlert size={24} />
                    </div>

                    <h2>Delete your account?</h2>
                    <p>
                        This will permanently delete your account and all associated data.
                        This action cannot be undone.
                    </p>

                    {deleteError && <p className={styles.errorMessage}>{deleteError}</p>}

                    <div className={styles.modalActions}>
                        <button className={styles.cancelBtn} onClick={() => setShowDeleteModal(false)} disabled={deleting}>
                            Cancel
                        </button>
                        <button className={styles.confirmDeleteBtn} onClick={handleDeleteAccount} disabled={deleting}>
                            {deleting ? 'Deleting...' : 'Yes, delete my account'}
                        </button>
                    </div>
                </div>
            </div>
        )}
        </div>
    );
}

export default Account;