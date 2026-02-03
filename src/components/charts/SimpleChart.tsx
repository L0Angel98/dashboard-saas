"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import styles from "./SimpleChart.module.scss";

type Point = {
  name: string;
  revenue: number;
  products: number;
};

export default function SimpleChart({ data }: { data: Point[] }) {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <div>
          <div className={styles.title}>Revenue trend</div>
          <div className={styles.subtitle}>Últimas órdenes (DummyJSON)</div>
        </div>
      </div>

      <div className={styles.chart}>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" hide />
            <YAxis tickFormatter={(v) => `$${Math.round(v / 1000)}k`} />
            <Tooltip
              formatter={(value: number | undefined, name: string) => [
                name === "revenue"
                  ? `$${(value ?? 0).toLocaleString("es-MX")}`
                  : value,
                name === "revenue" ? "Revenue" : "Products",
              ]}
              labelFormatter={(label) => `Order ${label}`}
            />
            <Line
              type="monotone"
              dataKey="revenue"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
