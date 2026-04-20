const SORTERS = {
  "name-asc": (a, b) => a.name.localeCompare(b.name),
  "name-desc": (a, b) => b.name.localeCompare(a.name),
  "pop-asc": (a, b) => a.population - b.population,
  "pop-desc": (a, b) => b.population - a.population,
};

export function filterAndSort(countries, { search, continent, sort }) {
  const query = search.trim().toLowerCase();
  const sorter = SORTERS[sort] ?? (() => 0);

  return countries
    .filter((country) => {
      const matchesSearch = country.name.toLowerCase().includes(query);
      const matchesContinent =
        continent === "All" || country.continent === continent;
      return matchesSearch && matchesContinent;
    })
    .sort(sorter);
}
