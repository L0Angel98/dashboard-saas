import DashboardLayout from "@/components/layout/DashboardLayout";
import Skeleton from "@/components/skeleton/Skeleton";

export default function LoadingUserDetail() {
  return (
    <DashboardLayout title="User details">
      <div style={{ display: "grid", gap: 14, maxWidth: 980 }}>
        <div
          style={{
            background: "#fff",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            borderRadius: 16,
            padding: 16,
            boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <Skeleton w={56} h={56} circle />
            <div style={{ display: "grid", gap: 8 }}>
              <Skeleton w={240} h={16} />
              <Skeleton w={200} h={12} />
            </div>
          </div>
        </div>

        <div
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}
        >
          <CardSkeleton />
          <CardSkeleton />
        </div>

        <CardSkeleton tall />
      </div>
    </DashboardLayout>
  );
}

function CardSkeleton({ tall }: { tall?: boolean }) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
      }}
    >
      <Skeleton w={140} h={14} />
      <div style={{ height: 12 }} />
      <Skeleton w={260} h={12} />
      <div style={{ height: 10 }} />
      <Skeleton w={220} h={12} />
      <div style={{ height: 10 }} />
      <Skeleton w={240} h={12} />
      {tall ? (
        <>
          <div style={{ height: 14 }} />
          <Skeleton w={520} h={120} />
        </>
      ) : null}
    </div>
  );
}

