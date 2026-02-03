import DashboardLayout from "@/components/layout/DashboardLayout";
import Plans from "@/components/billing/Plans";
import InvoicesTable from "@/components/billing/InvoicesTable";

export default function BillingPage() {
  return (
    <DashboardLayout title="Billing">
      <div style={{ display: "grid", gap: 14 }}>
        <Plans />
        <InvoicesTable />
      </div>
    </DashboardLayout>
  );
}
