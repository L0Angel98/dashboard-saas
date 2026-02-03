"use client";

import { useMemo, useState } from "react";

export default function UserNotes({ userId }: { userId: number }) {
  const key = useMemo(() => `notes:user:${userId}`, [userId]);
  const [value, setValue] = useState(() => {
    const saved = localStorage.getItem(`notes:user:${userId}`);
    return saved || "";
  });

  const save = () => localStorage.setItem(key, value);
  const clear = () => {
    setValue("");
    localStorage.removeItem(key);
  };

  return (
    <div style={{ display: "grid", gap: 10 }}>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={6}
        placeholder="Write an internal note…"
        style={{
          width: "100%",
          borderRadius: 12,
          border: "1px solid rgba(15,23,42,.12)",
          padding: 12,
          outline: "none",
          resize: "vertical",
        }}
      />

      <div style={{ display: "flex", gap: 10, justifyContent: "flex-end" }}>
        <button
          type="button"
          onClick={clear}
          style={{
            border: "1px solid rgba(15,23,42,.12)",
            background: "#fff",
            borderRadius: 12,
            padding: "10px 12px",
            cursor: "pointer",
            fontWeight: 800,
          }}
        >
          Clear
        </button>

        <button
          type="button"
          onClick={save}
          style={{
            border: "1px solid rgba(15,23,42,.12)",
            background: "rgba(15,23,42,.06)",
            borderRadius: 12,
            padding: "10px 12px",
            cursor: "pointer",
            fontWeight: 800,
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
}
