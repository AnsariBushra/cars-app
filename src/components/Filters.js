export default function Filters({ search, setSearch, filters, setFilters }) {
  const handleInput = (e) => setSearch(e.target.value);

  return (
    <div className="p-4 rounded shadow space-y-4 text-black dark:text-white">
      <input
        type="text"
        placeholder="Search car name..."
        value={search}
        onChange={handleInput}
        className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded  text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <select
          className="p-2 border border-gray-300 dark:border-gray-600 rounded text-black dark:text-white"
          value={filters.brand}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, brand: e.target.value }))
          }
        >
          <option value="">All Brands</option>
          <option value="Toyota">Toyota</option>
          <option value="Tesla">Tesla</option>
          <option value="BMW">BMW</option>
          <option value="Porsche">Porsche</option>
          <option value="Jaguar">Jaguar</option>
          <option value="Volvo">Volvo</option>
          <option value="Kia">Kia</option>
        </select>

        <select
          className="p-2 border border-gray-300 dark:border-gray-600 rounded text-black dark:text-white"
          value={filters.fuel}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, fuel: e.target.value }))
          }
        >
          <option value="">All Fuel Types</option>
          <option value="Petrol">Petrol</option>
          <option value="Electric">Electric</option>
        </select>

        <select
          className="p-2 border border-gray-300 dark:border-gray-600 rounded text-black dark:text-white"
          value={filters.sort}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, sort: e.target.value }))
          }
        >
          <option value="">Sort By</option>
          <option value="priceAsc">Price: Low → High</option>
          <option value="priceDesc">Price: High → Low</option>
        </select>
      </div>
    </div>
  );
}
