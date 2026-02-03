import DashboardLayout from "@/components/layout/DashboardLayout";
import DataTable from "@/components/table/DataTable";
import styles from "@/components/table/TableToolbar.module.scss";
import { getUsers, searchUsers, type User } from "@/lib/api/dummyjson";
import Link from "next/link";

type PageProps = {
  searchParams?: Promise<{
    q?: string;
    page?: string;
  }>;
};

const PAGE_SIZE = 10;

function fullName(u: User) {
  return `${u.firstName} ${u.lastName}`.trim();
}

export default async function UsersPage({ searchParams }: PageProps) {
  const sp = (await searchParams) ?? {};
  const q = (sp.q ?? "").trim();
  const page = Math.max(1, Number(sp.page ?? "1") || 1);

  const skip = (page - 1) * PAGE_SIZE;

  const data = q
    ? await searchUsers({ q, limit: PAGE_SIZE, skip })
    : await getUsers({ limit: PAGE_SIZE, skip });

  const totalPages = Math.max(1, Math.ceil(data.total / PAGE_SIZE));
  const canPrev = page > 1;
  const canNext = page < totalPages;

  const makeHref = (nextPage: number) => {
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    params.set("page", String(nextPage));
    return `/dashboard/users?${params.toString()}`;
  };

  return (
    <DashboardLayout title="Users">
      <div className={styles.toolbar}>
        <form
          className={styles.searchBox}
          action="/dashboard/users"
          method="GET"
        >
          <input
            name="q"
            defaultValue={q}
            placeholder="Search users… (name, etc.)"
          />
          <button className={styles.btn} type="submit">
            Search
          </button>
          {q ? (
            <Link className={styles.btn} href="/dashboard/users">
              Clear
            </Link>
          ) : null}
        </form>

        <div className={styles.pager}>
          <div className={styles.meta}>
            Page <b>{page}</b> of <b>{totalPages}</b> · Total{" "}
            <b>{data.total}</b>
          </div>

          <Link
            className={styles.btn}
            aria-disabled={!canPrev}
            href={makeHref(page - 1)}
          >
            Prev
          </Link>
          <Link
            className={styles.btn}
            aria-disabled={!canNext}
            href={makeHref(page + 1)}
          >
            Next
          </Link>
        </div>
      </div>

      <DataTable<User>
        columns={[
          {
            key: "name",
            header: "Name",
            render: (u) => (
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                {/* imagen opcional */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={u.image || "https://dummyimage.com/36x36/ddd/555&text=U"}
                  alt=""
                  width={36}
                  height={36}
                  style={{ borderRadius: 999 }}
                />
                <div>
                  <Link
                    href={`/dashboard/users/${u.id}`}
                    style={{
                      fontWeight: 800,
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    {fullName(u)}
                  </Link>

                  <div style={{ fontSize: 12, opacity: 0.75 }}>{u.email}</div>
                </div>
              </div>
            ),
          },
          { key: "age", header: "Age", render: (u) => u.age },
          {
            key: "company",
            header: "Company",
            render: (u) => u.company?.name ?? "—",
          },
          {
            key: "title",
            header: "Title",
            render: (u) => u.company?.title ?? "—",
          },
        ]}
        data={data.users}
      />
    </DashboardLayout>
  );
}
