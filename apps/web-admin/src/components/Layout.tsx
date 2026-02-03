import { Outlet, Link, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  return (
    <div
      style={{ display: "flex", minHeight: "100vh", fontFamily: "sans-serif" }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: 260,
          borderRight: "1px solid #eee",
          padding: 16,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 16 }}>
          Constitution RDC — Admin
        </div>

        <nav style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Link
            to="/"
            style={{
              textDecoration: "none",
              padding: "10px 12px",
              borderRadius: 8,
              background: location.pathname === "/" ? "#F3F4F6" : "transparent",
              color: "#111",
            }}
          >
            Dashboard
          </Link>

          {/* On ajoutera plus tard Titres/Chapitres/Articles */}
          <span style={{ color: "#6B7280", fontSize: 13, marginTop: 8 }}>
            (CRUD à venir)
          </span>
        </nav>
      </aside>

      {/* Main */}
      <div style={{ flex: 1 }}>
        {/* Header */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 16,
            borderBottom: "1px solid #eee",
          }}
        >
          <div style={{ fontWeight: 600 }}>Console d’administration</div>
          <button
            style={{
              padding: "8px 12px",
              borderRadius: 8,
              border: "1px solid #ddd",
              background: "white",
              cursor: "pointer",
            }}
            onClick={() => {
              // plus tard : logout réel
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
          >
            Déconnexion
          </button>
        </header>

        {/* Content */}
        <main style={{ padding: 16 }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
