import DashboardLayout from "@/components/layout/DashboardLayout";
import KpiCard from "@/components/kpi/KpiCard";
import SimpleChart from "@/components/charts/SimpleChart";
import { getKpis, getOrdersForChart } from "@/lib/api/dummyjson";

function formatMoneyMXN(value: number) {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    maximumFractionDigits: 0,
  }).format(value);
}

export default async function DashboardPage() {
  const [kpis, series] = await Promise.all([getKpis(), getOrdersForChart(30)]);

  return (
    <DashboardLayout title="Overview">
      <div style={{ display: "grid", gap: 16 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 14,
          }}
        >
          <KpiCard
            label="Total users"
            value={kpis.totalUsers.toLocaleString("es-MX")}
            hint="DummyJSON"
          />
          <KpiCard
            label="Products"
            value={kpis.totalProducts.toLocaleString("es-MX")}
            hint="DummyJSON"
          />
          <KpiCard
            label="Orders"
            value={kpis.totalOrders.toLocaleString("es-MX")}
            hint="DummyJSON"
          />
          <KpiCard
            label="Revenue (est.)"
            value={formatMoneyMXN(kpis.revenue)}
            hint="Sum of carts.total"
          />
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 14 }}
        >
          <SimpleChart data={series} />

          <div
            style={{
              background: "#fff",
              border: "1px solid rgba(15, 23, 42, 0.08)",
              borderRadius: 16,
              padding: 16,
              boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
            }}
          >
            <div style={{ fontWeight: 800, marginBottom: 8 }}>Quick notes</div>
            <div style={{ opacity: 0.8, fontSize: 14, lineHeight: 1.5 }}>
              • KPIs server-side
              <br />
              • Chart client-side (Recharts)
              <br />• Next step: User detail
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
