const BASE_URL = "https://dummyjson.com";

async function getJSON<T>(path: string): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, { cache: "no-store" });

  if (!res.ok) {
    throw new Error(
      `DummyJSON error: ${res.status} ${res.statusText} (${url})`,
    );
  }

  return res.json() as Promise<T>;
}


type TotalOnlyResponse = { total: number };

type Cart = { total: number };
type CartsResponse = {
  total: number;
  carts: Cart[];
};

export async function getKpis() {
  const [users, products, carts] = await Promise.all([
    getJSON<TotalOnlyResponse>("/users?limit=1"),
    getJSON<TotalOnlyResponse>("/products?limit=1"),
    getJSON<CartsResponse>("/carts?limit=100"),
  ]);

  const revenue = carts.carts.reduce((sum, c) => sum + (c.total ?? 0), 0);

  return {
    totalUsers: users.total,
    totalProducts: products.total,
    totalOrders: carts.total,
    revenue,
  };
}

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  company?: { name?: string; title?: string };
  image?: string;
};

type UsersResponse = {
  total: number;
  skip: number;
  limit: number;
  users: User[];
};

export async function getUsers(params: { limit: number; skip: number }) {
  const { limit, skip } = params;
  return getJSON<UsersResponse>(`/users?limit=${limit}&skip=${skip}`);
}

export async function searchUsers(params: { q: string; limit: number; skip: number }) {
  const { q, limit, skip } = params;
  const safeQ = encodeURIComponent(q);
  return getJSON<UsersResponse>(`/users/search?q=${safeQ}&limit=${limit}&skip=${skip}`);
}

type CartForChart = {
  id: number;
  total: number;
  totalProducts: number;
  discountedTotal?: number;
};

type CartsChartResponse = {
  carts: CartForChart[];
};

export async function getOrdersForChart(limit = 30) {
  const data = await getJSON<CartsChartResponse>(`/carts?limit=${limit}`);
  return data.carts.map((c, idx) => ({
    // label corto para el eje X
    name: `#${c.id}`,
    revenue: c.total,
    products: c.totalProducts,
    // por si quieres alternar en el futuro
    idx: idx + 1,
  }));
}

export async function getUserById(id: number) {
  return getJSON<User>(`/users/${id}`);
}

