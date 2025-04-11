"use client";

import { useEffect, useState } from "react";
import CarCard from "../components/CarCard";
import FilterBar from "../components/Filters";

export default function Home() {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [search, setSearch] = useState("");

  const [filters, setFilters] = useState({
    brand: "",
    fuel: "",
    price: [0, 100000],
    sort: "",
  });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  const carsPerPage = 10;

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const res = await fetch("/mock-data.json");
        const data = await res.json();
        setCars(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching cars:", err);
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    let filtered = cars.filter((car) => {
      return (
        car.name.toLowerCase().includes(search.toLowerCase()) &&
        (filters.brand === "" || car.brand === filters.brand) &&
        (filters.fuel === "" || car.fuel === filters.fuel) &&
        car.price >= filters.price[0] &&
        car.price <= filters.price[1]
      );
    });

    // Sorting
    if (filters.sort === "priceAsc") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "priceDesc") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredCars(filtered);
    setPage(1);
  }, [search, filters, cars]);

  const paginatedCars = filteredCars.slice(
    (page - 1) * carsPerPage,
    page * carsPerPage
  );

  return (
    <div className="space-y-4">
      <FilterBar
        search={search}
        setSearch={setSearch}
        filters={filters}
        setFilters={setFilters}
      />

      {loading ? (
        <p>Loading cars...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {paginatedCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Prev
            </button>
            <span>Page {page}</span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={page * carsPerPage >= filteredCars.length}
              className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
