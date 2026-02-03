import styles from "./InvoicesTable.module.scss";

type Invoice = {
  id: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
};

const invoices: Invoice[] = [
  { id: "INV-1042", date: "2026-01-18", amount: 499, status: "paid" },
  { id: "INV-1031", date: "2025-12-18", amount: 499, status: "paid" },
  { id: "INV-1020", date: "2025-11-18", amount: 499, status: "paid" },
  { id: "INV-1012", date: "2025-10-18", amount: 499, status: "paid" },
  { id: "INV-1006", date: "2025-09-18", amount: 499, status: "pending" },
];

const money = (n: number) =>
  new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(n);

export default function InvoicesTable() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>Invoices</div>
          <div className={styles.subtitle}>
            Tabla mock simulando SaaS real.
          </div>
        </div>
        <button className={styles.btn} type="button">
          Download CSV
        </button>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Invoice</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td className={styles.mono}>{inv.id}</td>
                <td>{inv.date}</td>
                <td>{money(inv.amount)}</td>
                <td>
                  <span className={`${styles.pill} ${styles[inv.status]}`}>
                    {inv.status}
                  </span>
                </td>
                <td style={{ textAlign: "right" }}>
                  <button className={styles.linkBtn} type="button">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
