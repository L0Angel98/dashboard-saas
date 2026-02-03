import styles from "./KpiCard.module.scss";

type Props = {
  label: string;
  value: string;
  hint?: string;
};

export default function KpiCard({ label, value, hint }: Props) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      {hint ? <div className={styles.hint}>{hint}</div> : null}
    </div>
  );
}
