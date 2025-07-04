// Updated useFlightSearch hook with proper API response handling
import { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";

const API_KEY = import.meta.env.VITE_RAPIDAPI_KEY;

function useFlightSearch() {
  const [fromAirport, setFromAirport] = useState(null);
  const [toAirport, setToAirport] = useState(null);
  const [queryFrom, setQueryFrom] = useState("");
  const [queryTo, setQueryTo] = useState("");
  const [suggestionsFrom, setSuggestionsFrom] = useState([]);
  const [suggestionsTo, setSuggestionsTo] = useState([]);
  const [showSuggestionsFrom, setShowSuggestionsFrom] = useState(false);
  const [showSuggestionsTo, setShowSuggestionsTo] = useState(false);

  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [tripType, setTripType] = useState("roundtrip");
  const [travelClass, setTravelClass] = useState("economy");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);

  const [flightResults, setFlightResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showResults, setShowResults] = useState(false);

  // Suggest airport from API
  const fetchSuggestions = async (query, setter) => {
    if (!query || query.length < 2) return setter([]);

    try {
      const res = await axios.get(
        "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport",
        {
          params: { query },
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
          },
        }
      );

      const mapped = (res.data?.data || []).map((item) => ({
        skyId: item.skyId, // e.g., 'KTM'
        entityId: item.entityId, // e.g., 95673458
        label:
          item.presentation?.suggestionTitle ||
          item.presentation?.title ||
          "Unknown",
        country: item.presentation?.subtitle || "",
        city: item.navigation?.localizedName || "",
        fullData: item,
      }));

      setter(mapped);
    } catch (err) {
      console.error("Suggestion error:", err);
      setter([]);
    }
  };

  // Debounced search
  useEffect(() => {
    const t = setTimeout(() => {
      if (queryFrom) {
        fetchSuggestions(queryFrom, setSuggestionsFrom);
        setShowSuggestionsFrom(true);
      } else {
        setShowSuggestionsFrom(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [queryFrom]);

  useEffect(() => {
    const t = setTimeout(() => {
      if (queryTo) {
        fetchSuggestions(queryTo, setSuggestionsTo);
        setShowSuggestionsTo(true);
      } else {
        setShowSuggestionsTo(false);
      }
    }, 300);
    return () => clearTimeout(t);
  }, [queryTo]);

  const handleSelectAirport = (airport, type) => {
    if (type === "from") {
      setFromAirport(airport);
      setQueryFrom(airport.label);
      setShowSuggestionsFrom(false);
    } else {
      setToAirport(airport);
      setQueryTo(airport.label);
      setShowSuggestionsTo(false);
    }
  };

  const handleFromInputChange = (e) => {
    const value = e.target.value;
    setQueryFrom(value);
    if (fromAirport && value !== fromAirport.label) {
      setFromAirport(null);
    }
  };

  const handleToInputChange = (e) => {
    const value = e.target.value;
    setQueryTo(value);
    if (toAirport && value !== toAirport.label) {
      setToAirport(null);
    }
  };

  const formatDate = (date) => (date ? format(date, "MMM d, yyyy") : "");

  // Transform API response to match component expectations
  const transformFlightData = (apiData) => {
    if (!apiData || !apiData.itineraries || apiData.itineraries.length === 0) {
      return [];
    }

    return apiData.itineraries.map((itinerary, index) => ({
      id: `flight-${index}`,
      price: {
        formatted:
          itinerary.price?.formatted || `$${itinerary.price?.raw || 0}`,
        raw: itinerary.price?.raw || 0,
      },
      legs: itinerary.legs || [],
      score: itinerary.score || Math.random() * 10, // Generate random score if not provided
      isSelfTransfer: itinerary.isSelfTransfer || false,
      farePolicy: itinerary.farePolicy || {
        isChangeAllowed: false,
        isPartiallyChangeable: false,
      },
    }));
  };

  const handleExplore = async () => {
    const newErrors = {};

    // Validation
    if (!fromAirport) newErrors.from = "Select valid departure airport";
    if (!toAirport) newErrors.to = "Select valid destination airport";
    if (fromAirport && toAirport && fromAirport.skyId === toAirport.skyId)
      newErrors.to = "Departure and destination can't be same";

    if (!departureDate) {
      newErrors.departure = "Select a departure date";
    } else if (departureDate < new Date().setHours(0, 0, 0, 0)) {
      newErrors.departure = "Departure date can't be in past";
    }

    if (tripType === "roundtrip") {
      if (!returnDate) {
        newErrors.return = "Select return date";
      } else if (returnDate < departureDate) {
        newErrors.return = "Return can't be before departure";
      }
    }

    const totalPassengers = adults + children + infants;
    if (totalPassengers === 0) {
      newErrors.passengers = "At least one passenger is required";
    } else if (totalPassengers > 9) {
      newErrors.passengers = "Maximum 9 passengers allowed";
    }

    if (infants > adults) {
      newErrors.passengers = "Infants cannot exceed number of adults";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setShowResults(false);
    setFlightResults([]);

    try {
      const params = {
        originSkyId: fromAirport.skyId,
        originEntityId: fromAirport.entityId,
        destinationSkyId: toAirport.skyId,
        destinationEntityId: toAirport.entityId,
        date: format(departureDate, "yyyy-MM-dd"),
        adults,
        children,
        infants,
        travelClass,
      };

      // Only add returnDate for roundtrip
      if (tripType === "roundtrip" && returnDate) {
        params.returnDate = format(returnDate, "yyyy-MM-dd");
      }

      console.log("Search params:", params);

      const res = await axios.get(
        "https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights",
        {
          params,
          headers: {
            "X-RapidAPI-Key": API_KEY,
            "X-RapidAPI-Host": "sky-scrapper.p.rapidapi.com",
          },
        }
      );

      console.log("API Response:", res.data);

      const transformedData = transformFlightData(res.data?.data);

      if (transformedData.length === 0) {
        // If no flights found, show mock data for demonstration
        const mockFlightData = [
          {
            id: "mock-1",
            price: { formatted: "$299", raw: 299 },
            legs: [
              {
                origin: {
                  name: fromAirport.city || fromAirport.label,
                  displayCode: fromAirport.iataCode,
                },
                destination: {
                  name: toAirport.city || toAirport.label,
                  displayCode: toAirport.iataCode,
                },
                departure: new Date(departureDate).toISOString(),
                arrival: new Date(
                  new Date(departureDate).getTime() + 5 * 60 * 60 * 1000
                ).toISOString(),
                durationInMinutes: 300,
                carriers: [{ name: "Sample Airlines", alternativeText: "SA" }],
                segments: [
                  {
                    origin: {
                      name: fromAirport.city || fromAirport.label,
                      displayCode: fromAirport.iataCode,
                    },
                    destination: {
                      name: toAirport.city || toAirport.label,
                      displayCode: toAirport.iataCode,
                    },
                    departure: new Date(departureDate).toISOString(),
                    arrival: new Date(
                      new Date(departureDate).getTime() + 5 * 60 * 60 * 1000
                    ).toISOString(),
                    flightNumber: "SA 4162",
                    marketingCarrier: {
                      name: "Sample Airlines",
                      alternativeText: "SA",
                    },
                  },
                ],
                stopCount: 0,
              },
            ],
            score: 8.5,
            isSelfTransfer: false,
            farePolicy: { isChangeAllowed: true, isPartiallyChangeable: false },
          },
        ];
        setFlightResults(mockFlightData);
        setErrors({
          general: "No flights found for your search. Showing sample data.",
        });
      } else {
        setFlightResults(transformedData);
        setErrors({});
      }

      setShowResults(true);
    } catch (err) {
      console.error("Flight fetch failed:", err);
      setErrors({ general: "Failed to fetch flights. Please try again." });

      // Show mock data on error for demonstration
      const mockFlightData = [
        {
          id: "mock-1",
          price: { formatted: "$299", raw: 299 },
          legs: [
            {
              origin: { name: "Sample Origin", displayCode: "XXX" },
              destination: { name: "Sample Destination", displayCode: "YYY" },
              departure: new Date().toISOString(),
              arrival: new Date(
                new Date().getTime() + 5 * 60 * 60 * 1000
              ).toISOString(),
              durationInMinutes: 300,
              carriers: [{ name: "Sample Airlines", alternativeText: "SA" }],
              segments: [
                {
                  origin: { name: "Sample Origin", displayCode: "XXX" },
                  destination: {
                    name: "Sample Destination",
                    displayCode: "YYY",
                  },
                  departure: new Date().toISOString(),
                  arrival: new Date(
                    new Date().getTime() + 5 * 60 * 60 * 1000
                  ).toISOString(),
                  flightNumber: "SA 1234",
                  marketingCarrier: {
                    name: "Sample Airlines",
                    alternativeText: "SA",
                  },
                },
              ],
              stopCount: 0,
            },
          ],
          score: 8.5,
          isSelfTransfer: false,
          farePolicy: { isChangeAllowed: true, isPartiallyChangeable: false },
        },
      ];
      setFlightResults(mockFlightData);
      setShowResults(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    fromAirport,
    toAirport,
    queryFrom,
    queryTo,
    suggestionsFrom,
    suggestionsTo,
    showSuggestionsFrom,
    showSuggestionsTo,
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
    showResults,
  };
}

export default useFlightSearch;
