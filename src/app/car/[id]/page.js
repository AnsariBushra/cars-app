"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function CarDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/mock-data.json");
        const data = await res.json();
        const foundCar = data.find((c) => c.id == id);
        setCar(foundCar);

        const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
        setWishlisted(wishlist.some((c) => c.id == id));

        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const toggleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (wishlisted) {
      wishlist = wishlist.filter((c) => c.id != id);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setWishlisted(false);
      router.refresh();
    } else {
      wishlist.push(car);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setWishlisted(true);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!car) return <p>Car not found.</p>;

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-60 object-cover rounded mb-4"
      />
      <h2 className="text-2xl font-bold mb-2">{car.name}</h2>
      <p className="text-gray-600 mb-1">
        <strong>Brand:</strong> {car.brand}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Fuel:</strong> {car.fuel}
      </p>
      <p className="text-gray-600 mb-1">
        <strong>Seats:</strong> {car.seats}
      </p>
      <p className="text-xl font-semibold my-2">
        ${car.price.toLocaleString()}
      </p>

      <button
        onClick={toggleWishlist}
        className={`mt-2 px-4 py-2 rounded ${
          wishlisted ? "bg-red-500 text-white" : "bg-gray-200 hover:bg-gray-300"
        }`}
      >
        {wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
    </div>
  );
}
