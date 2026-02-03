import { notFound } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import UserNotes from "@/components/users/UserNotes";
import { getUserById, type User } from "@/lib/api/dummyjson";
import Link from "next/link";

type PageProps = {
  params: Promise<{ id: string }>;
};


function fullName(u: User) {
  return `${u.firstName} ${u.lastName}`.trim();
}

export default async function UserDetailPage({ params }: PageProps) {
  const p = await params;
  const id = Number(p.id);


  if (!Number.isInteger(id) || id <= 0) notFound();

 let user;
 try {
   user = await getUserById(id);
 } catch {
   notFound();
 }



  return (
    <DashboardLayout title="User details">
      <div style={{ display: "grid", gap: 14, maxWidth: 980 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={user.image || "https://dummyimage.com/56x56/ddd/555&text=U"}
              alt=""
              width={56}
              height={56}
              style={{ borderRadius: 999 }}
            />
            <div>
              <div style={{ fontSize: 18, fontWeight: 900 }}>
                {fullName(user)}
              </div>
              <div style={{ fontSize: 13, opacity: 0.75 }}>{user.email}</div>
            </div>
          </div>

          <Link
            href="/dashboard/users"
            style={{
              textDecoration: "none",
              border: "1px solid rgba(15, 23, 42, 0.12)",
              background: "#fff",
              borderRadius: 12,
              padding: "10px 12px",
              color: "inherit",
            }}
          >
            ← Back
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: 14,
            minWidth: 0,
          }}
        >
          <Card title="Profile">
            <Row label="Age" value={String(user.age ?? "—")} />
            <Row label="Company" value={user.company?.name ?? "—"} />
            <Row label="Title" value={user.company?.title ?? "—"} />
          </Card>

          <Card title="Internal notes">
            <UserNotes userId={user.id} />
          </Card>
        </div>

        <Card title="Raw JSON (para debug / portafolio)">
          <pre
            style={{
              margin: 0,
              padding: 12,
              background: "rgba(15, 23, 42, 0.04)",
              borderRadius: 12,
              overflow: "auto",
              fontSize: 12,
            }}
          >
            {JSON.stringify(user, null, 2)}
          </pre>
        </Card>
      </div>
    </DashboardLayout>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid rgba(15, 23, 42, 0.08)",
        borderRadius: 16,
        padding: 16,
        boxShadow: "0 10px 24px rgba(15, 23, 42, 0.06)",
        minWidth: 0,
      }}
    >
      <div style={{ fontWeight: 900, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: 12,
        padding: "8px 0",
      }}
    >
      <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
      <div style={{ fontSize: 14, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
