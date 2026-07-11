import styles from './Support.module.css';

function Support(){
    return (<div className={styles.supportContainer}>
      <h2>Support</h2>
      <p className={styles.intro}>
        Need help with ClearCents? We're here for you.
      </p>

      <div className={styles.section}>
        <h3>Contact us</h3>
        <p>
          Email us at{' '}
          <a href="mailto:support@clearcents.com">support@clearcents.com</a>{' '}
          and we'll get back to you as soon as we can — usually within 24–48 hours.
        </p>
      </div>

      <div className={styles.section}>
        <h3>Common questions</h3>

        <div className={styles.faqItem}>
          <h4>I forgot my password. How do I reset it?</h4>
          <p>Reach out to us at the email above and we'll help you regain access to your account.</p>
        </div>

        <div className={styles.faqItem}>
          <h4>How do I add a subscription?</h4>
          <p>From your Dashboard, use the "Add Subscription" form to enter the name and monthly price of any service you're tracking.</p>
        </div>

        <div className={styles.faqItem}>
          <h4>How do I delete a subscription?</h4>
          <p>Click the "Delete" button on any subscription card in your Dashboard to remove it.</p>
        </div>

        <div className={styles.faqItem}>
          <h4>Is my data secure?</h4>
          <p>Yes — your account is protected using industry-standard authentication, and your data is never shared with third parties.</p>
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.footerNote}>
          Didn't find what you were looking for? Email us anytime at{' '}
          <a href="mailto:support@clearcents.com">support@clearcents.com</a>.
        </p>
      </div>
    </div>
  );
}

export default Support;