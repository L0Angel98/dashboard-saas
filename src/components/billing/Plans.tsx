"use client";

import { useMemo, useState } from "react";
import styles from "./Plans.module.scss";

type Plan = {
  name: string;
  priceMonthly: number;
  priceYearly: number;
  desc: string;
  features: string[];
  highlight?: boolean;
};

export default function Plans() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  const plans: Plan[] = useMemo(
    () => [
      {
        name: "Starter",
        priceMonthly: 199,
        priceYearly: 1990,
        desc: "Para probar el producto sin dolor.",
        features: [
          "1 workspace",
          "Up to 3 users",
          "Basic analytics",
          "Email support",
        ],
      },
      {
        name: "Pro",
        priceMonthly: 499,
        priceYearly: 4990,
        desc: "Para equipos que sí lo usan diario.",
        features: [
          "5 workspaces",
          "Up to 15 users",
          "Advanced analytics",
          "Priority support",
        ],
        highlight: true,
      },
      {
        name: "Business",
        priceMonthly: 999,
        priceYearly: 9990,
        desc: "Para operación seria y escalable.",
        features: [
          "Unlimited workspaces",
          "Unlimited users",
          "Audit logs",
          "SLA + onboarding",
        ],
      },
    ],
    [],
  );

  const money = (n: number) =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      maximumFractionDigits: 0,
    }).format(n);

  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>Plans</div>
          <div className={styles.subtitle}>
            Esto es mock, simulación de producto real.
          </div>
        </div>

        <div className={styles.toggle}>
          <button
            className={`${styles.toggleBtn} ${billing === "monthly" ? styles.active : ""}`}
            onClick={() => setBilling("monthly")}
            type="button"
          >
            Monthly
          </button>
          <button
            className={`${styles.toggleBtn} ${billing === "yearly" ? styles.active : ""}`}
            onClick={() => setBilling("yearly")}
            type="button"
          >
            Yearly <span className={styles.badge}>-15%</span>
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {plans.map((p) => {
          const price = billing === "monthly" ? p.priceMonthly : p.priceYearly;
          const unit = billing === "monthly" ? "/mo" : "/yr";

          return (
            <div
              key={p.name}
              className={`${styles.card} ${p.highlight ? styles.highlight : ""}`}
            >
              <div className={styles.planTop}>
                <div className={styles.planName}>{p.name}</div>
                <div className={styles.planDesc}>{p.desc}</div>
              </div>

              <div className={styles.price}>
                <span className={styles.priceValue}>{money(price)}</span>
                <span className={styles.priceUnit}>{unit}</span>
              </div>

              <ul className={styles.features}>
                {p.features.map((f) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>

              <button className={styles.cta} type="button">
                Choose plan
              </button>

              {p.highlight ? (
                <div className={styles.ribbon}>Most popular</div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
