import { useCallback, useEffect, useState } from "react";
import { fetchCountries } from "../api/countries";

const NETWORK_ERROR_MESSAGE =
  "Could not reach the server. Check your internet connection and try again.";

export function useCountries() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchCountries();
      setCountries(data);
    } catch (err) {
      setError(err instanceof TypeError ? NETWORK_ERROR_MESSAGE : err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return {
    countries,
    loading,
    error,
    refetch: load,
    clearError: () => setError(""),
  };
}
