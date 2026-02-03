export default function Dashboard() {
  return (
    <div>
      <h2 style={{ marginTop: 0 }}>Dashboard</h2>
      <p>Bienvenue sur la console d’administration.</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, minmax(0, 1fr))", gap: 12 }}>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 13, color: "#6B7280" }}>Titres</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>—</div>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 13, color: "#6B7280" }}>Chapitres</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>—</div>
        </div>
        <div style={{ border: "1px solid #eee", borderRadius: 12, padding: 16 }}>
          <div style={{ fontSize: 13, color: "#6B7280" }}>Articles</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>—</div>
        </div>
      </div>
    </div>
  );
}
