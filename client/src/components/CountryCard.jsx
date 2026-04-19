function CountryCard({ country }) {
  return (
    <article className="country-card">
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
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
      </div>
    </article>
  );
}

export default CountryCard;
