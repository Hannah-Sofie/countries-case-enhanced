import CountryCard from "./CountryCard";

function CountriesGrid({ countries }) {
  return (
    <section className="countries-grid">
      {countries.map((country) => (
        <CountryCard key={country.id} country={country} />
      ))}
    </section>
  );
}

export default CountriesGrid;
