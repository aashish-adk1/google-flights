import React from "react"
import { Card, CardContent } from "../ui/card"
import FlightSearchForm from "./FlightSearchForm"

export default function SearchForm() {
  return (
    <Card className="bg-white shadow-lg">
      <CardContent className="p-6">
        <FlightSearchForm />
      </CardContent>
    </Card>
  )
}