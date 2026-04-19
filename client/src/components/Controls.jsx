function Controls({ search, setSearch, continent, setContinent }) {
  return (
    <div className="controls">
      <input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select value={continent} onChange={(e) => setContinent(e.target.value)}>
        <option value="All">All continents</option>
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
        <option value="Africa">Africa</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
}

export default Controls;
