import React, { useState, useMemo } from "react";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { 
  Plane, 
  Clock, 
  MapPin, 
  Wifi, 
  Coffee, 
  Monitor,
  Star,
  TrendingUp,
  DollarSign
} from "lucide-react";

// Mock flight data that matches typical RapidAPI Sky Scrapper response structure
const mockFlightData = [
  {
    id: "1",
    price: { formatted: "$299", raw: 299 },
    legs: [
      {
        origin: { name: "New York", displayCode: "JFK" },
        destination: { name: "Los Angeles", displayCode: "LAX" },
        departure: "2025-07-15T08:30:00",
        arrival: "2025-07-15T11:45:00",
        durationInMinutes: 375,
        carriers: [
          { name: "American Airlines", logoUrl: "", alternativeText: "AA" }
        ],
        segments: [
          {
            origin: { name: "New York", displayCode: "JFK" },
            destination: { name: "Los Angeles", displayCode: "LAX" },
            departure: "2025-07-15T08:30:00",
            arrival: "2025-07-15T11:45:00",
            flightNumber: "AA 1234",
            marketingCarrier: { name: "American Airlines", alternativeText: "AA" }
          }
        ],
        stopCount: 0
      }
    ],
    score: 8.5,
    isSelfTransfer: false,
    farePolicy: { isChangeAllowed: true, isPartiallyChangeable: false }
  },
  {
    id: "2", 
    price: { formatted: "$245", raw: 245 },
    legs: [
      {
        origin: { name: "New York", displayCode: "JFK" },
        destination: { name: "Los Angeles", displayCode: "LAX" },
        departure: "2025-07-15T14:20:00",
        arrival: "2025-07-15T20:15:00",
        durationInMinutes: 475,
        carriers: [
          { name: "Delta", logoUrl: "", alternativeText: "DL" }
        ],
        segments: [
          {
            origin: { name: "New York", displayCode: "JFK" },
            destination: { name: "Chicago", displayCode: "ORD" },
            departure: "2025-07-15T14:20:00",
            arrival: "2025-07-15T16:45:00",
            flightNumber: "DL 567",
            marketingCarrier: { name: "Delta", alternativeText: "DL" }
          },
          {
            origin: { name: "Chicago", displayCode: "ORD" },
            destination: { name: "Los Angeles", displayCode: "LAX" },
            departure: "2025-07-15T18:30:00",
            arrival: "2025-07-15T20:15:00",
            flightNumber: "DL 890",
            marketingCarrier: { name: "Delta", alternativeText: "DL" }
          }
        ],
        stopCount: 1
      }
    ],
    score: 7.2,
    isSelfTransfer: false,
    farePolicy: { isChangeAllowed: false, isPartiallyChangeable: true }
  },
  {
    id: "3",
    price: { formatted: "$189", raw: 189 },
    legs: [
      {
        origin: { name: "New York", displayCode: "JFK" },
        destination: { name: "Los Angeles", displayCode: "LAX" },
        departure: "2025-07-15T06:15:00",
        arrival: "2025-07-15T15:30:00",
        durationInMinutes: 555,
        carriers: [
          { name: "Spirit Airlines", logoUrl: "", alternativeText: "NK" }
        ],
        segments: [
          {
            origin: { name: "New York", displayCode: "JFK" },
            destination: { name: "Denver", displayCode: "DEN" },
            departure: "2025-07-15T06:15:00",
            arrival: "2025-07-15T09:20:00",
            flightNumber: "NK 445",
            marketingCarrier: { name: "Spirit Airlines", alternativeText: "NK" }
          },
          {
            origin: { name: "Denver", displayCode: "DEN" },
            destination: { name: "Los Angeles", displayCode: "LAX" },
            departure: "2025-07-15T12:45:00",
            arrival: "2025-07-15T15:30:00",
            flightNumber: "NK 778",
            marketingCarrier: { name: "Spirit Airlines", alternativeText: "NK" }
          }
        ],
        stopCount: 1
      }
    ],
    score: 6.8,
    isSelfTransfer: false,
    farePolicy: { isChangeAllowed: false, isPartiallyChangeable: false }
  },
  {
    id: "4",
    price: { formatted: "$425", raw: 425 },
    legs: [
      {
        origin: { name: "New York", displayCode: "JFK" },
        destination: { name: "Los Angeles", displayCode: "LAX" },
        departure: "2025-07-15T10:00:00",
        arrival: "2025-07-15T13:25:00",
        durationInMinutes: 385,
        carriers: [
          { name: "JetBlue", logoUrl: "", alternativeText: "B6" }
        ],
        segments: [
          {
            origin: { name: "New York", displayCode: "JFK" },
            destination: { name: "Los Angeles", displayCode: "LAX" },
            departure: "2025-07-15T10:00:00",
            arrival: "2025-07-15T13:25:00",
            flightNumber: "B6 615",
            marketingCarrier: { name: "JetBlue", alternativeText: "B6" }
          }
        ],
        stopCount: 0
      }
    ],
    score: 9.1,
    isSelfTransfer: false,
    farePolicy: { isChangeAllowed: true, isPartiallyChangeable: false }
  }
];

export default function FlightResultsTable({ flightData = mockFlightData }) {
  const [sortBy, setSortBy] = useState("best");

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit', 
      hour12: true 
    });
  };

  const sortedFlights = useMemo(() => {
    const flights = [...flightData];
    if (sortBy === "best") {
      return flights.sort((a, b) => (b.score || 0) - (a.score || 0));
    } else if (sortBy === "cheapest") {
      return flights.sort((a, b) => (a.price?.raw || 0) - (b.price?.raw || 0));
    }
    return flights;
  }, [flightData, sortBy]);

  const getStopText = (stopCount) => {
    if (stopCount === 0) return "Nonstop";
    if (stopCount === 1) return "1 stop";
    return `${stopCount} stops`;
  };

  const getAirlineColor = (airline) => {
    const colors = {
      "American Airlines": "bg-red-100 text-red-800",
      "Delta": "bg-blue-100 text-blue-800", 
      "Spirit Airlines": "bg-yellow-100 text-yellow-800",
      "JetBlue": "bg-indigo-100 text-indigo-800",
    };
    return colors[airline] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6">
      {/* Filter Tabs */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={sortBy === "best" ? "default" : "outline"}
          onClick={() => setSortBy("best")}
          className={`gap-2 ${
            sortBy === "best" 
              ? "bg-blue-600 hover:bg-blue-700 text-white" 
              : "backdrop-blur-sm bg-white/80 border border-gray-300 hover:bg-white/90"
          }`}
        >
          <Star className="h-4 w-4" />
          Best
        </Button>
        <Button
          variant={sortBy === "cheapest" ? "default" : "outline"}
          onClick={() => setSortBy("cheapest")}
          className={`gap-2 ${
            sortBy === "cheapest" 
              ? "bg-blue-600 hover:bg-blue-700 text-white" 
              : "backdrop-blur-sm bg-white/80 border border-gray-300 hover:bg-white/90"
          }`}
        >
          <DollarSign className="h-4 w-4" />
          Cheapest
        </Button>
      </div>

      {/* Results Header */}
      <div className="mb-4">
        <p className="text-gray-600">
          {sortedFlights.length} flights found • Sorted by {sortBy === "best" ? "Best value" : "Price (low to high)"}
        </p>
      </div>

      {/* Flight Results Table */}
      <div className="space-y-3">
        {sortedFlights.map((flight) => {
          const leg = flight.legs[0];
          const mainSegment = leg.segments[0];
          const lastSegment = leg.segments[leg.segments.length - 1];
          
          return (
            <div 
              key={flight.id}
              className="backdrop-blur-sm bg-white/90 border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-all duration-200 hover:bg-white/95"
            >
              <div className="grid grid-cols-12 gap-4 items-center">
                {/* Airline Logo & Flight Info */}
                <div className="col-span-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-xs font-semibold">
                      {leg.carriers[0]?.alternativeText || "??"}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{leg.carriers[0]?.name}</div>
                      <div className="text-xs text-gray-500">
                        {leg.segments.map(seg => seg.flightNumber).join(", ")}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Departure */}
                <div className="col-span-2 text-center">
                  <div className="font-semibold text-lg">
                    {formatTime(mainSegment.departure)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {leg.origin.displayCode}
                  </div>
                  <div className="text-xs text-gray-500">
                    {leg.origin.name}
                  </div>
                </div>

                {/* Flight Duration & Stops */}
                <div className="col-span-2 text-center">
                  <div className="flex items-center justify-center mb-1">
                    <div className="w-12 h-px bg-gray-300"></div>
                    <Plane className="h-3 w-3 mx-2 text-gray-400 rotate-90" />
                    <div className="w-12 h-px bg-gray-300"></div>
                  </div>
                  <div className="text-sm font-medium">
                    {formatDuration(leg.durationInMinutes)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {getStopText(leg.stopCount)}
                  </div>
                </div>

                {/* Arrival */}
                <div className="col-span-2 text-center">
                  <div className="font-semibold text-lg">
                    {formatTime(lastSegment.arrival)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {leg.destination.displayCode}
                  </div>
                  <div className="text-xs text-gray-500">
                    {leg.destination.name}
                  </div>
                </div>

                {/* Price & Features */}
                <div className="col-span-2 text-center">
                  <div className="font-bold text-xl text-green-600 mb-1">
                    {flight.price.formatted}
                  </div>
                  <div className="flex justify-center gap-1 mb-2">
                    {flight.score && flight.score > 8.5 && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                        Best value
                      </Badge>
                    )}
                    {flight.price.raw < 200 && (
                      <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-800">
                        Low price
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Select Button */}
                <div className="col-span-1">
                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm"
                    size="sm"
                  >
                    Select
                  </Button>
                </div>
              </div>

              {/* Additional Flight Details */}
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getAirlineColor(leg.carriers[0]?.name)}`}
                      >
                        {leg.carriers[0]?.name}
                      </Badge>
                    </span>
                    {leg.stopCount > 0 && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {leg.segments.slice(0, -1).map(seg => seg.destination.displayCode).join(", ")}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    {flight.farePolicy?.isChangeAllowed && (
                      <span className="text-green-600">Free changes</span>
                    )}
                    {flight.score && (
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {flight.score}/10
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More */}
      <div className="text-center mt-6">
        <Button 
          variant="outline"
          className="backdrop-blur-sm bg-white/80 border border-gray-300 hover:bg-white/90"
        >
          Load more flights
        </Button>
      </div>
    </div>
  );
}