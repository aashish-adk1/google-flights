import React from "react"
import { Card, CardContent } from "../ui/card"

export default function DestinationCard({ destination }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-32 object-cover rounded-t-lg"
        />
        <div className="p-4">
          <h3 className="font-medium">{destination.name}</h3>
          {destination.price && (
            <p className="text-2xl font-bold text-green-600">{destination.price}</p>
          )}
          <p className="text-sm text-gray-500">{destination.dates}</p>
          {destination.duration && (
            <p className="text-sm text-gray-500">{destination.duration}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}