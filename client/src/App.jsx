import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CountriesGrid from "./components/CountriesGrid";
import Controls from "./components/Controls";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState("All");
  const [sort, setSort] = useState("name-asc");

  const fetchCountries = async () => {
    try {
      setLoading(true);
      setError("");

      const backendUrl =
        import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

      const response = await fetch(`${backendUrl}/api/countries`);

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        const details = body.details || body.error || response.statusText;

        if (response.status >= 500) {
          throw new Error(
            `Server error (${response.status}): ${details}. Please try again in a moment.`
          );
        }

        throw new Error(
          `Request failed (${response.status}): ${details}.`
        );
      }

      const data = await response.json();
      setCountries(data.countries);
    } catch (error) {
      if (error instanceof TypeError) {
        setError(
          "Could not reach the server. Check your internet connection and try again."
        );
      } else {
        setError(error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const filteredCountries = countries
    .filter((country) => {
      const matchesSearch = country.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesContinent =
        continent === "All" || country.continent === continent;

      return matchesSearch && matchesContinent;
    })
    .sort((a, b) => {
      if (sort === "name-asc") {
        return a.name.localeCompare(b.name);
      }
      if (sort === "name-desc") {
        return b.name.localeCompare(a.name);
      }
      if (sort === "pop-asc") {
        return a.population - b.population;
      }
      if (sort === "pop-desc") {
        return b.population - a.population;
      }
      return 0;
    });

  return (
    <main className="app">
      <Header
        onFetch={fetchCountries}
        loading={loading}
        error={error}
        onDismissError={() => setError("")}
      />

      {loading && <p className="status">Loading countries...</p>}

      <Controls
        search={search}
        setSearch={setSearch}
        continent={continent}
        setContinent={setContinent}
        sort={sort}
        setSort={setSort}
        loading={loading}
      />

      {!loading && filteredCountries.length === 0 && (
        <p className="status">No countries found.</p>
      )}

      {filteredCountries.length > 0 && (
        <CountriesGrid countries={filteredCountries} />
      )}
    </main>
  );
}

export default App;
