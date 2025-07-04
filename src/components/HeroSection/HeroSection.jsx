import React from "react"
import SearchForm from "./SearchForm"

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-b from-blue-50 to-white pt-16 pb-8">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://ext.same-assets.com/2859086088/669458345.svg"
          alt="Travel illustration"
          className="w-full h-full object-cover opacity-30"
        />
      </div>
      <div className="relative max-w-4xl mx-auto text-center px-4">
        <h1 className="text-6xl font-normal text-gray-800 mb-12">Flights</h1>
        <SearchForm />
      </div>
    </section>
  )
}