import React from "react"
export default function DestinationTile({ destination }) {
  const [imageError, setImageError] = React.useState(false)
  
  return (
    <div className="flex flex-col items-center">
      <div className="w-full aspect-square overflow-hidden rounded-lg bg-gray-100">
        {imageError ? (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Image not available</span>
          </div>
        ) : (
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-full object-cover"
            onError={() => setImageError(true)}
            loading="lazy"
          />
        )}
      </div>
      <p className="mt-2 text-sm font-medium">{destination.name}</p>
    </div>
  )
}
