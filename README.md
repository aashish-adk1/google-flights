✈️ Flight Search App (Google Flights Clone)
A full-featured flight search application inspired by Google Flights, built using React, Tailwind CSS, and the RapidAPI SkyScrapper API. Users can search flights based on airport, date, travel class, and number of passengers. Results include real-time (or mock) flight data with error handling and beautiful UI.

📸 Preview



🚀 Features
🔍 Airport autocomplete with suggestions

📅 Departure & return date calendar pickers

👨‍👩‍👧‍👦 Passenger count dropdown (Adults, Children, Infants)

🎫 Travel class selection (Economy, Business, First, etc.)

📦 Mock fallback data if API returns nothing

⚠️ Error handling for invalid inputs and API failures

💨 Responsive and elegant UI

🛠️ Tech Stack
Frontend: React, Tailwind CSS, Lucide Icons

API: SkyScrapper API

Routing: React Router

State Management: React hooks and custom useFlightSearch hook

Date Formatting: date-fns

📦 Installation
bash
Copy
Edit
git clone https://github.com/your-username/flight-search-app.git
cd flight-search-app
npm install
⚙️ Environment Variables
Before running the project, create a .env file in the root directory and add:

env
Copy
Edit
VITE_RAPIDAPI_KEY=your_rapidapi_key_here
You can get your API key from RapidAPI SkyScrapper.

🧪 Running the App Locally
bash
Copy
Edit
npm run dev
The app will run on http://localhost:5173 by default (if using Vite).

🧾 How to Use
Type your departure and destination airports (autocomplete will show suggestions).

Choose trip type: Oneway / Roundtrip

Pick departure and return dates.

Select travel class (Economy, Premium, etc.)

Add number of passengers.

Click Explore to fetch available flights.

If no data is returned from the API, mock data will be shown with an error message.

🌐 Deployment
You can deploy this app easily using:

▶ Vercel (Recommended)
Push code to GitHub

Go to vercel.com

Import the repository

Add environment variable VITE_RAPIDAPI_KEY

Deploy!

📁 Project Structure
css
Copy
Edit
src/
│
├── components/
│   ├── FlightSearchForm.jsx
│   ├── FlightResultsTable/
│   └── ui/                # Shadcn-like components
│
├── hooks/
│   └── useFlightSearch.js
│
├── App.jsx
├── main.jsx
└── index.css
🧑‍💻 Author
Aashish Adhikari
📍 Nepal
🔗 LinkedIn
🐙 GitHub

⭐ Contributions
Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

