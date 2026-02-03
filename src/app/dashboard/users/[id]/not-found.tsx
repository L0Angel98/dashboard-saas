import Link from "next/link";
import DashboardLayout from "@/components/layout/DashboardLayout";
import styles from "./not-found.module.scss";

export default function NotFound() {
  return (
    <DashboardLayout title="Page not found">
      <div className={styles.wrap}>
        <div className={styles.card}>
          <div className={styles.code}>404</div>
          <div className={styles.title}>User not found</div>
          <div className={styles.subtitle}>
            The user you’re looking for doesn’t exist.
          </div>

          <div className={styles.actions}>
            {/* <Link className={styles.btnPrimary} href="/dashboard">
              Back to Dashboard
            </Link> */}
            <Link className={styles.btnGhost} href="/dashboard/users">
              Go to Users
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
