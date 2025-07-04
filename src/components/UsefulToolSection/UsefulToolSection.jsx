import React from "react"
import { Calendar, TrendingUp, Bell } from "lucide-react"
export default function UsefulToolsSection() {
 const tools = [
    {
      icon: Calendar,
      title: "Find the cheapest days to fly",
      description: "The Date grid and Price graph make it easy to see the best flight deals"
    },
    {
      icon: TrendingUp,
      title: "See the whole picture with price insights",
      description: "Price history and trend data show you when to book to get the best price on your flight"
    },
    {
      icon: Bell,
      title: "Track prices for a trip",
      description: "Not ready to book yet? Observe price changes for a route or flight and get notified when prices drop."
    }
  ]

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-xl font-medium mb-8">Useful tools to help you find the best deals</h2>

     <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {tools.map((tool, index) => {
          const IconComponent = tool.icon;
          return (
            <div key={index} className="flex gap-4">
              <IconComponent className="h-12 w-12 mt-1 text-blue-600" />
              <div>
                <h3 className="font-medium mb-2">{tool.title}</h3>
                <p className="text-sm text-gray-600">{tool.description}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-medium mb-4">Insightful tools help you choose your trip dates</h3>
          <p className="text-sm text-gray-600 mb-4">
            If your travel plans are flexible, use the form above to start searching for a specific trip.
            Then, play around with the <strong>Date grid</strong> and <strong>Price graph</strong> options
            on the Search page to find the cheapest days to get to your destination – and back again for round trips.
          </p>
        </div>
       <div className="bg-gray-100 rounded-lg p-4 h-40 flex items-center justify-center">
            <div className="grid grid-cols-8 gap-1">
              {Array.from({ length: 32 }, (_, i) => (
                <div
                  key={i}
                  className={`w-6 h-6 rounded ${
                    i % 7 === 0 || i % 7 === 6 ? 'bg-gray-300' :
                    Math.random() > 0.7 ? 'bg-green-400' : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
          </div>
      </div>
    </section>
  )
}