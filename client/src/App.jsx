import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("http://localhost:3001/api/countries");

      if (!response.ok) {
        throw new Error("Could not fetch countries");
      }

      const data = await response.json();
      setCountries(data.countries);
    } catch (error) {
      setError("Something went wrong while fetching countries.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <main className="app">
      <header className="app-header">
        <h1>Countries of the world</h1>
        <p>10 random countries fetched from the API</p>

        <div className="actions">
          <button onClick={fetchCountries} disabled={loading}>
            {loading ? "Loading..." : "Fetch new countries"}
          </button>
        </div>

        {error && <p className="error">{error}</p>}
      </header>

      <section className="countries-grid">
        {countries.map((country) => (
          <article key={country.id} className="country-card">
            <div className="flag-wrapper">
              <img
                src={country.flag}
                alt={`Flag of ${country.name}`}
                className="flag"
              />
            </div>

            <h2>{country.name}</h2>

            <div className="country-info">
              <p>
                <strong>Capital:</strong> {country.capital}
              </p>
              <p>
                <strong>Continent:</strong> {country.continent}
              </p>
              <p>
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

export default App;
