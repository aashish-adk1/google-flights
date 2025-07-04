import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const popularRoutes = [
    "Flights from New York to London",
    "Flights from New York to Paris",
    "Flights from London to Paris",
    "Flights from New York to Rome",
    "Flights from Montreal to Paris",
    "Flights from London to Milan",
    "Flights from Toronto to London",
    "Flights from New York to Milan",
    "Flights from London to Dubai",
    "Flights from London to Tokyo",
    "Flights from Madrid to Rome",
    "Flights from London to Delhi",
  ];

  const footerLinks = [
    "About",
    "Privacy",
    "Terms",
    "Join user studies",
    "Feedback",
    "Help Center",
  ];

  // Helper to extract "from" and "to" from route string
  const extractRouteParams = (route) => {
    const match = route.match(/Flights from (.+) to (.+)/);
    return match ? { from: match[1], to: match[2] } : { from: "", to: "" };
  };

  return (
    <footer className="bg-gray-50 border-t px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Popular Routes */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {[0, 4, 8].map((start, i) => (
            <div key={i}>
              <div className={`space-y-2 text-sm ${i !== 0 ? "pt-8" : ""}`}>
                {popularRoutes.slice(start, start + 4).map((route, index) => {
                  const { from, to } = extractRouteParams(route);
                  return (
                    <Link
                      key={index}
                      to={`/search?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`}
                      className="text-blue-600 hover:underline block"
                    >
                      {route}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Location & Language Info */}
        <div className="border-t pt-8 flex flex-wrap items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-6">
            <span>Language • English (United States)</span>
            <span>Location • United States</span>
            <span>Currency • USD</span>
          </div>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-sm text-gray-600">
          {footerLinks.map((link, index) => (
            <a key={index} href="#" className="hover:text-gray-900">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
