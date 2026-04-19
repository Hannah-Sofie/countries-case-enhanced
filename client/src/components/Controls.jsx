function Controls({
  search,
  setSearch,
  continent,
  setContinent,
  sort,
  setSort,
}) {
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

      <select value={sort} onChange={(e) => setSort(e.target.value)}>
        <option value="name-asc">Name (A–Z)</option>
        <option value="name-desc">Name (Z–A)</option>
        <option value="pop-asc">Population (low to high)</option>
        <option value="pop-desc">Population (high to low)</option>
      </select>
    </div>
  );
}

export default Controls;
