import styles from './Help.module.css';

function Help(){
    return (<div className={styles.helpContainer}>
      <h2>Help</h2>
      <p className={styles.intro}>
        A quick guide to getting the most out of ClearCents.
      </p>

      <div className={styles.section}>
        <h3>Getting started</h3>
        <p>
          After signing up, you'll land on your Dashboard — this is where all your
          tracked subscriptions live. Add a new subscription using the form at the
          bottom of the page: just enter its name and monthly price.
        </p>
      </div>

      <div className={styles.section}>
        <h3>Managing subscriptions</h3>

        <div className={styles.helpItem}>
          <h4>Adding a subscription</h4>
          <p>
            Enter the subscription name and its monthly price, then click "Add Subscription."
            It'll appear as a card on your Dashboard right away.
          </p>
        </div>

        <div className={styles.helpItem}>
          <h4>Removing a subscription</h4>
          <p>
            Click "Delete" on any subscription card to remove it permanently from your account.
          </p>
        </div>

        <div className={styles.helpItem}>
          <h4>Tracking usage</h4>
          <p>
            Each subscription can store how many hours you actually use it — this
            helps you see which services are worth the cost and which ones aren't
            pulling their weight.
          </p>
        </div>
      </div>

      <div className={styles.section}>
        <h3>Insights</h3>
        <p>
          The Insights tab will show spending trends and cost-per-use breakdowns
          across all your subscriptions — this feature is coming soon.
        </p>
      </div>

      <div className={styles.section}>
        <h3>Account & security</h3>
        <p>
          You can sign out at any time using the "Sign out" button in the navigation
          bar. Your session stays active across page refreshes until you sign out.
        </p>
      </div>

      <div className={styles.section}>
        <p className={styles.footerNote}>
          Still have questions? Visit our <a href="/support">Support</a> page to get in touch.
        </p>
      </div>
    </div>)
}

export default Help;