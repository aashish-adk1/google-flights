import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom"
import useFlightSearch from "../hooks/useFlightSearch";
import FlightResultsTable from "../FlightResultsTable/FlightResultsTable";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Search, Calendar as CalendarIcon, MapPin, Users } from "lucide-react";

export default function FlightSearchForm() {
  const [searchParams] = useSearchParams()
  const {
    fromAirport,
    toAirport,
    queryFrom,
    queryTo,
    suggestionsFrom,
    suggestionsTo,
    setQueryFrom,
    setQueryTo,
    handleFromInputChange,
    handleToInputChange,
    handleSelectAirport,
    departureDate,
    returnDate,
    setDepartureDate,
    setReturnDate,
    tripType,
    setTripType,
    travelClass,
    setTravelClass,
    adults,
    setAdults,
    children,
    setChildren,
    infants,
    setInfants,
    formatDate,
    handleExplore,
    flightResults,
    loading,
    errors,
    showSuggestionsFrom,
    showSuggestionsTo,
    showResults,
  } = useFlightSearch();

  useEffect(() => {
  const from = searchParams.get("from")
  const to = searchParams.get("to")

  if (from) setQueryFrom(from)
  if (to) setQueryTo(to)
}, [])

  return (
    <>
      {/* Trip Type and Passenger Selection */}
      <div className="flex flex-wrap gap-4 mb-6">
        <Select value={tripType} onValueChange={setTripType}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="backdrop-blur-md bg-white/90 border border-gray-200">
            <SelectItem value="roundtrip">Round trip</SelectItem>
            <SelectItem value="oneway">One way</SelectItem>
            <SelectItem value="multicity">Multi-city</SelectItem>
          </SelectContent>
        </Select>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Users className="h-4 w-4" />
              {adults + children + infants} passenger
              {adults + children + infants !== 1 ? "s" : ""}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-4 backdrop-blur-md bg-white/90 border border-gray-200">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Adults</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAdults((prev) => Math.max(1, prev - 1))}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{adults}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setAdults((prev) => Math.min(9, prev + 1))}
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Children</div>
                  <div className="text-sm text-gray-600">Aged 2 to 11</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setChildren((prev) => Math.max(0, prev - 1))}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{children}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setChildren((prev) =>
                        Math.min(9 - adults - infants, prev + 1)
                      )
                    }
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">Infants</div>
                  <div className="text-sm text-gray-600">Under 2</div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setInfants((prev) => Math.max(0, prev - 1))}
                  >
                    -
                  </Button>
                  <span className="w-8 text-center">{infants}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() =>
                      setInfants((prev) =>
                        Math.min(
                          adults,
                          Math.min(9 - adults - children, prev + 1)
                        )
                      )
                    }
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <Select value={travelClass} onValueChange={setTravelClass}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="backdrop-blur-md bg-white/90 border border-gray-200">
            <SelectItem value="economy">Economy</SelectItem>
            <SelectItem value="premium">Premium economy</SelectItem>
            <SelectItem value="business">Business</SelectItem>
            <SelectItem value="first">First</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Passenger validation error */}
      {errors.passengers && (
        <div className="text-red-500 text-sm mb-4">{errors.passengers}</div>
      )}

      {/* Search Form */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* FROM Airport */}
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
          <Input
            placeholder="From"
            value={queryFrom}
            onChange={handleFromInputChange}
            className={`pl-10 backdrop-blur-sm bg-white/80 border ${
              errors.from ? "border-red-500" : "border-gray-300"
            } focus:bg-white/90`}
          />
          {errors.from && (
            <div className="text-red-500 text-sm mt-1">{errors.from}</div>
          )}

          {/* FROM Suggestions */}
          {showSuggestionsFrom && suggestionsFrom.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-20 max-h-48 overflow-y-auto">
              {suggestionsFrom.map((airport, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectAirport(airport, "from")}
                >
                  <div className="font-medium">{airport.label}</div>
                  <div className="text-sm text-gray-600">{airport.country}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* TO Airport */}
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400 z-10" />
          <Input
            placeholder="Where to?"
            value={queryTo}
            onChange={handleToInputChange}
            className={`pl-10 backdrop-blur-sm bg-white/80 border ${
              errors.to ? "border-red-500" : "border-gray-300"
            } focus:bg-white/90`}
          />
          {errors.to && (
            <div className="text-red-500 text-sm mt-1">{errors.to}</div>
          )}

          {/* TO Suggestions */}
          {showSuggestionsTo && suggestionsTo.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-md shadow-lg z-20 max-h-48 overflow-y-auto">
              {suggestionsTo.map((airport, index) => (
                <div
                  key={index}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectAirport(airport, "to")}
                >
                  <div className="font-medium">{airport.label}</div>
                  <div className="text-sm text-gray-600">{airport.country}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Departure Date */}
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={`justify-start text-left w-full backdrop-blur-sm bg-white/80 border ${
                  errors.departure ? "border-red-500" : "border-gray-300"
                } hover:bg-white/90`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {departureDate ? formatDate(departureDate) : "Departure"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 backdrop-blur-md bg-white/90 border border-gray-200">
              <Calendar
                mode="single"
                selected={departureDate}
                onSelect={setDepartureDate}
                fromDate={new Date()}
              />
            </PopoverContent>
          </Popover>
          {errors.departure && (
            <div className="text-red-500 text-sm mt-1">{errors.departure}</div>
          )}
        </div>

        {/* Return Date */}
        <div>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                disabled={tripType !== "roundtrip"}
                className={`justify-start text-left w-full backdrop-blur-sm bg-white/80 border ${
                  errors.return ? "border-red-500" : "border-gray-300"
                } hover:bg-white/90 ${
                  tripType !== "roundtrip" ? "opacity-50" : ""
                }`}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {returnDate && tripType === "roundtrip"
                  ? formatDate(returnDate)
                  : "Return"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 backdrop-blur-md bg-white/90 border border-gray-200">
              <Calendar
                mode="single"
                selected={returnDate}
                onSelect={setReturnDate}
                fromDate={departureDate || new Date()}
              />
            </PopoverContent>
          </Popover>
          {errors.return && (
            <div className="text-red-500 text-sm mt-1">{errors.return}</div>
          )}
        </div>
      </div>

      {/* General error */}
      {errors.general && (
        <div className="text-red-500 text-sm mb-4">{errors.general}</div>
      )}

      {/* Explore Button */}
      <Button
        className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 shadow-lg disabled:opacity-50"
        onClick={handleExplore}
        disabled={loading}
      >
        <Search className="mr-2 h-4 w-4" />
        {loading ? "Searching..." : "Explore"}
      </Button>

      {/* Flight Results */}
      {showResults && (
        <div className="mt-8">
          <FlightResultsTable flightData={flightResults} />
        </div>
      )}
    </>
  );
}
