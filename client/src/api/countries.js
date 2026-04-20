const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

export async function fetchCountries() {
  const response = await fetch(`${BACKEND_URL}/api/countries`);

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const details = body.details || body.error || response.statusText;

    if (response.status >= 500) {
      throw new Error(
        `Server error (${response.status}): ${details}. Please try again in a moment.`
      );
    }

    throw new Error(`Request failed (${response.status}): ${details}.`);
  }

  const data = await response.json();
  return data.countries;
}
