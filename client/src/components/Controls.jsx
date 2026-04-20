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
      <label htmlFor="search" className="visually-hidden">
        Search countries by name
      </label>
      <input
        id="search"
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <label htmlFor="continent" className="visually-hidden">
        Filter by continent
      </label>
      <select
        id="continent"
        value={continent}
        onChange={(e) => setContinent(e.target.value)}
      >
        <option value="All">All continents</option>
        <option value="Europe">Europe</option>
        <option value="Asia">Asia</option>
        <option value="Africa">Africa</option>
        <option value="North America">North America</option>
        <option value="South America">South America</option>
        <option value="Oceania">Oceania</option>
      </select>

      <label htmlFor="sort" className="visually-hidden">
        Sort countries
      </label>
      <select
        id="sort"
        value={sort}
        onChange={(e) => setSort(e.target.value)}
      >
        <option value="name-asc">Name (A–Z)</option>
        <option value="name-desc">Name (Z–A)</option>
        <option value="pop-asc">Population (low to high)</option>
        <option value="pop-desc">Population (high to low)</option>
      </select>
    </div>
  );
}

export default Controls;
