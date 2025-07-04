import React from "react"
import { Button } from "../ui/button"

export default function Header() {
  return (
    <header className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 bg-white">
      <div className="flex items-center gap-4 sm:gap-8">
        <div className="flex items-center gap-3">
          <img
            src="https://ext.same-assets.com/2859086088/3415714960.svg"
            alt="Google"
            className="h-6 sm:h-7"
          />
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
            Explore
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
            Trips
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200">
            Travel insights
          </a>
        </nav>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <button className="hidden sm:flex items-center gap-1 text-gray-600 hover:text-gray-800 text-sm font-medium transition-colors duration-200">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z" clipRule="evenodd" />
          </svg>
          EN
        </button>

        <button className="hidden sm:flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <svg className="w-5 h-5 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>

        <div className="hidden sm:flex items-center gap-2">
          <Button 
            variant="ghost" 
            className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-medium px-4 py-2 transition-all duration-200 border-2 border-blue-600"
          >
            Log in
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 shadow-sm transition-all duration-200 hover:shadow-md">
            Sign up
          </Button>
        </div>

        <div className="flex sm:hidden items-center gap-1">
          <Button 
            variant="ghost" 
            className="text-blue-600 hover:bg-blue-50 hover:text-blue-700 font-medium px-3 py-1 text-sm transition-all duration-200 border border-blue-600"
          >
            Log in
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1 text-sm shadow-sm transition-all duration-200 hover:shadow-md">
            Sign up
          </Button>
        </div>

        <button className="md:hidden flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-100 transition-colors duration-200">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  )
}