function Header({ onFetch, loading, error, onDismissError }) {
  return (
    <header className="app-header">
      <h1>Countries of the world</h1>
      <p>10 random countries fetched from the API</p>

      <div className="actions">
        <button onClick={onFetch} disabled={loading}>
          {loading ? "Loading..." : "Fetch new countries"}
        </button>
      </div>

      {error && (
        <div className="error" role="alert">
          <span>{error}</span>
          <button
            type="button"
            className="error-dismiss"
            onClick={onDismissError}
            aria-label="Dismiss error"
          >
            ×
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
