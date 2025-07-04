import React from "react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import DestinationCard from "./DestinationCard";
import { Button } from "../ui/button";

export default function CheapFlightsSection() {
  const destinations = [
    {
      id: 1,
      name: "Hong Kong",
      price: "$469",
      dates: "Sep 4 — Sep 10",
      duration: "1 stop 15 hr 35 min",
      image:
        "https://images.unsplash.com/photo-1536431311719-398b6704d4cc?w=400&h=300&fit=crop",
    },
    {
      id: 2,
      name: "New Delhi",
      price: "$150",
      dates: "Jul 20 — Jul 27",
      duration: "Nonstop 1 hr 55 min",
      image:
        "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=400&h=300&fit=crop",
    },
    {
      id: 3,
      name: "New York",
      price: "",
      dates: "Jul 27 — Aug 5",
      duration: "",
      image:
        "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&h=300&fit=crop",
    },
    {
      id: 4,
      name: "Sydney",
      price: "",
      dates: "Aug 17 — Aug 26",
      duration: "",
      image:
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
    },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-medium">
          Find cheap flights from your place to anywhere
        </h2>
        <Button variant="ghost" size="sm" className="text-gray-500 p-1">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />
          </svg>
        </Button>
      </div>

      <Tabs defaultValue="portland" className="mb-8">
        <TabsList>
          <TabsTrigger value="portland">Bangkok</TabsTrigger>
          <TabsTrigger value="seattle">Dubai</TabsTrigger>
          <TabsTrigger value="eugene">New York</TabsTrigger>
          <TabsTrigger value="redmond">Singapore</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="relative mb-8 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg overflow-hidden h-96">
        <img
          src="https://ext.same-assets.com/2859086088/2200881330.svg"
          alt="World map"
          className="w-full h-full object-cover"
        />
        <Button className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-300 text-blue-600 hover:bg-gray-50">
          Explore destinations
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {destinations.map((destination, index) => (
          <DestinationCard key={index} destination={destination} />
        ))}
      </div>
    </section>
  );
}
