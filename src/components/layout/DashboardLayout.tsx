"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import styles from "./DashboardLayout.module.scss";

type Props = {
  title?: string;
  children: React.ReactNode;
};

export default function DashboardLayout({
  title = "Dashboard",
  children,
}: Props) {
  const pathname = usePathname();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [, startTransition] = useTransition();

  const isExact = (href: string) => pathname === href;
  const isSection = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  // Cierra sidebar al cambiar de ruta
  useEffect(() => {
    startTransition(() => {
      setIsMobileOpen(false);
    });
  }, [pathname, startTransition]);

  return (
    <div className={styles.shell}>
      {/* overlay solo en móvil cuando está abierto */}
      <button
        className={`${styles.overlay} ${isMobileOpen ? styles.overlayOpen : ""}`}
        aria-label="Close menu"
        onClick={() => setIsMobileOpen(false)}
        type="button"
      />

      <aside
        className={`${styles.sidebar} ${isMobileOpen ? styles.sidebarOpen : ""}`}
      >
        <div className={styles.brand}>
          <div className={styles.logo}>DS</div>
          <div>
            <div className={styles.brandName}>Dashboard SaaS</div>
            <div className={styles.brandTag}>demo</div>
          </div>
        </div>

        <nav className={styles.nav}>
          <Link
            className={`${styles.link} ${isExact("/dashboard") ? styles.active : ""}`}
            href="/dashboard"
          >
            Overview
          </Link>

          <Link
            className={`${styles.link} ${isSection("/dashboard/users") ? styles.active : ""}`}
            href="/dashboard/users"
          >
            Users
          </Link>

          <Link
            className={`${styles.link} ${isSection("/dashboard/billing") ? styles.active : ""}`}
            href="/dashboard/billing"
          >
            Billing
          </Link>
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.userCard}>
            <div className={styles.avatar}>A</div>
            <div>
              <div className={styles.userName}>Ángel</div>
              <div className={styles.userRole}>Admin</div>
            </div>
          </div>
        </div>
      </aside>

      <main className={styles.main}>
        <header className={styles.topbar}>
          <div className={styles.leftTopbar}>
            <button
              className={styles.menuBtn}
              aria-label="Open menu"
              onClick={() => setIsMobileOpen(true)}
              type="button"
            >
              ☰
            </button>
            <h1 className={styles.pageTitle}>{title}</h1>
          </div>

          <div className={styles.actions}>
            <div className={styles.search}>
              <input placeholder="Search…" />
            </div>
            <button className={styles.iconBtn} aria-label="Notifications">
              🔔
            </button>
            <button className={styles.iconBtn} aria-label="Profile">
              👤
            </button>
          </div>
        </header>

        <section className={styles.content}>{children}</section>
      </main>
    </div>
  );
}
