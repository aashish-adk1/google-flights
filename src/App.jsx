import React from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Header from "./components/Header/Navbar"
import HeroSection from "./components/HeroSection/HeroSection"
import CheapFlightsSection from "./components/CheapFlightSection/CheapFlightSection"
import UsefulToolsSection from "./components/UsefulToolSection/UsefulToolSection"
import PopularDestinations from "./components/PopularDestinations/PopularDestinations"
import FAQSection from "./components/FAQSection/FAQSection"
import Footer from "./components/Footer/Footer"
import FlightSearchForm from "./components/HeroSection/FlightSearchForm"

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/search" element={<FlightSearchForm />} />
        <Route
          path="/"
          element={
            <>
              <Header />
              <HeroSection />
              <CheapFlightsSection />
              <UsefulToolsSection />
              <PopularDestinations />
              <FAQSection />
              <Footer />
            </>
          }
        />
      </Routes>
    </Router>
  )
}
