"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import CarCard from "@/components/CarCard";
import { MoveLeft } from "lucide-react";

export default function WishlistPage() {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlist(saved);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = wishlist.filter((car) => car.id !== id);
    localStorage.setItem("wishlist", JSON.stringify(updated));
    setWishlist(updated);
  };

  return (
    <div>
      <h1 className="text-3xl flex justify-center font-extrabold border-2 p-2 rounded-2xl mb-4 bg-gray-100 text-blue-900">
        Your Wishlist
      </h1>
      <Link href="/" className="flex items-center mt-10 hover:underline">
        <MoveLeft className="mr-2" />
        Back to Home
      </Link>
      {wishlist.length === 0 ? (
        <p className="text-gray-600 flex text-4xl font-extrabold justify-center items-center h-96">
          No cars in your wishlist yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {wishlist.map((car) => (
            <CarCard
              key={car.id}
              car={car}
              removable
              onRemove={removeFromWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}
