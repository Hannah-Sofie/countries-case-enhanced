function Header({ onFetch, loading, error }) {
  return (
    <header className="app-header">
      <h1>Countries of the world</h1>
      <p>10 random countries fetched from the API</p>

      <div className="actions">
        <button onClick={onFetch} disabled={loading}>
          {loading ? "Loading..." : "Fetch new countries"}
        </button>
      </div>

      {error && <p className="error">{error}</p>}
    </header>
  );
}

export default Header;
