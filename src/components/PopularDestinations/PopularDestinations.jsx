import React from "react"
import DestinationTile from "./DestinationTile"

export default function PopularDestinations() {
  const destinations = [
  { name: "Washington", image: "https://images.unsplash.com/photo-1581097543550-b3cbe2e6ea6e?w=400&h=400&fit=crop" }, 
  { name: "Chicago", image: "https://images.unsplash.com/photo-1494522855154-9297ac14b55f?w=400&h=400&fit=crop" }, 
  { name: "New York", image: "https://images.unsplash.com/photo-1485871981521-5b1fd3805eee?w=400&h=400&fit=crop" }, 
  { name: "Dallas", image: "https://images.unsplash.com/photo-1621904878414-d4ca4756bd7e?w=400&h=400&fit=crop" }, 
  { name: "Seattle", image: "https://images.unsplash.com/photo-1502175353174-a7a70e73b362?w=400&h=400&fit=crop" }, 
  { name: "Houston", image: "https://images.unsplash.com/photo-1530089711124-9ca31fb9e863?w=400&h=400&fit=crop" } 
]
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-xl font-medium mb-6">Popular destinations from Portland</h2>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {destinations.map((destination, index) => (
          <DestinationTile key={index} destination={destination} />
        ))}
      </div>
    </section>
  )
}
