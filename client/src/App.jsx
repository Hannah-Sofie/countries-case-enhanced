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
      <Header onFetch={fetchCountries} loading={loading} error={error} />

      {loading && <p className="status">Loading countries...</p>}

      <Controls
        search={search}
        setSearch={setSearch}
        continent={continent}
        setContinent={setContinent}
        sort={sort}
        setSort={setSort}
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
