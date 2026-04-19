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

  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesContinent =
      continent === "All" || country.continent === continent;

    return matchesSearch && matchesContinent;
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
