import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import CountriesGrid from "./components/CountriesGrid";

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
      <Header onFetch={fetchCountries} loading={loading} error={error} />
      <CountriesGrid countries={countries} />
    </main>
  );
}

export default App;
