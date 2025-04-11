"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CarCard({ car, removable = false, onRemove }) {
  const [wishlisted, setWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    setWishlisted(wishlist.some((c) => c.id === car.id));
  }, [car.id]);

  const toggleWishlist = () => {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (wishlisted) {
      wishlist = wishlist.filter((c) => c.id !== car.id);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setWishlisted(false);
      if (removable && onRemove) {
        onRemove(car.id);
      }
    } else {
      wishlist.push(car);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
      setWishlisted(true);
    }
  };

  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 1.2,
        delay: 0.2,
        ease: [0, 0.71, 0.2, 0.99],
      }}
      className="border rounded m-3 shadow hover:shadow-md p-4 flex flex-col justify-between"
    >
      <img
        src={car.image}
        alt={car.name}
        className="h-56 w-full object-cover rounded mb-2"
      />
      <h2 className="text-lg font-semibold">{car.name}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        {car.brand} • {car.fuel} • {car.seats} seats
      </p>
      <p className="font-bold">${car.price.toLocaleString()}</p>

      <button
        onClick={toggleWishlist}
        className={`mt-2 px-3 py-1 rounded cursor-pointer ${
          wishlisted
            ? "bg-blue-300 text-white hover:bg-blue-300"
            : "bg-gray-200 dark:bg-black hover:bg-gray-400 dark:text-white"
        }`}
      >
        {wishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
      </button>
    </motion.div>
  );
}
