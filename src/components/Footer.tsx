"use client";
import React, { useState, useEffect } from "react";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Update tahun hak cipta setiap tahun baru
    const interval = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 1000 * 60); // Setiap menit
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="bg-primary-700 text-info-400 py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm sm:text-base md:text-lg lg:text-xl">
          © {currentYear} Plate Recognition App
        </p>
        <div className="flex justify-center mt-4">
          <a
            href="https://github.com/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600 transition duration-300"
          >
            GitHub
          </a>
          <span className="mx-2 text-gray-400">|</span>
          <a
            href="https://linkedin.com/in/yourname"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-600 transition duration-300"
          >
            LinkedIn
          </a>
          <span className="mx-2 text-gray-400">|</span>
          <a
            href="mailto:youremail@example.com"
            className="text-blue-400 hover:text-blue-600 transition duration-300"
          >
            Email
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
