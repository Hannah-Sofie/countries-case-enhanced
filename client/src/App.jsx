import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CountriesGrid from "./components/CountriesGrid";
import Controls from "./components/Controls";
import { useCountries } from "./hooks/useCountries";
import { filterAndSort } from "./utils/filterSort";

function App() {
  const { countries, loading, error, refetch, clearError } = useCountries();
  const [search, setSearch] = useState("");
  const [continent, setContinent] = useState("All");
  const [sort, setSort] = useState("name-asc");

  const visibleCountries = filterAndSort(countries, {
    search,
    continent,
    sort,
  });

  return (
    <main className="app">
      <Header
        onFetch={refetch}
        loading={loading}
        error={error}
        onDismissError={clearError}
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

      {!loading && visibleCountries.length === 0 && (
        <p className="status">No countries found.</p>
      )}

      {visibleCountries.length > 0 && (
        <CountriesGrid countries={visibleCountries} />
      )}
    </main>
  );
}

export default App;
