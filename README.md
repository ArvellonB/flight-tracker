Flight Path Calculator API
Overview
This project is a simple Express.js API that helps calculate flight paths. If you're given a list of flights, it can figure out where the journey starts, where it ends, and even lay out the entire route, including all layovers. It's handy for anyone dealing with flight logistics, like building travel apps or analyzing flight routes.

Features
Find the starting and ending airports: Based on a series of connected flights, it determines where the journey starts and where it ends.
Get the complete flight path: It can map out the entire route, including all stops and layovers, in the correct order.
Handles edge cases: If there are missing data or issues with the flight list, it will give you helpful error messages.
Tech Stack
Node.js: JavaScript runtime for building server-side applications.
Express.js: Fast, lightweight web framework for Node.js.
JavaScript: The language used for the backend logic.
Getting Started
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/flight-path-calculator.git
cd flight-path-calculator
Install dependencies:

Make sure you have Node.js installed, then run:

bash
Copy code
npm install
Start the server:

Run the server locally with:

bash
Copy code
npm start
The server will be available at http://localhost:8080.

How to Use
Endpoints
POST /calculate-start-end

Use this endpoint to find out the start and end airports for a journey. Pass in an array of flights (source and destination pairs), and it will tell you where the journey begins and ends.

Request:

json
Copy code
{
  "flights": [
    ["JFK", "ATL"],
    ["ATL", "SFO"],
    ["SFO", "LAX"]
  ]
}
Response:

json
Copy code
["JFK", "LAX"]
This means the journey starts at JFK and ends at LAX.

POST /calculate-full-path

This endpoint gives you the full flight path, including any layovers. It connects all the flights in the correct order and returns the route from start to finish.

Request:

json
Copy code
{
  "flights": [
    ["JFK", "ATL"],
    ["ATL", "SFO"],
    ["SFO", "LAX"]
  ]
}
Response:

json
Copy code
["JFK", "ATL", "SFO", "LAX"]
The response shows the full journey from JFK to LAX, with stops in ATL and SFO.

Example Scenario: Layovers
If you're flying from Los Angeles (LAX) to New York (JFK), but your flight stops in Denver (DEN) and Chicago (ORD) along the way, you can pass the following data:

Request:

json
Copy code
{
  "flights": [
    ["LAX", "DEN"],
    ["DEN", "ORD"],
    ["ORD", "JFK"]
  ]
}
Response:

json
Copy code
["LAX", "DEN", "ORD", "JFK"]
This shows the complete route, including the layovers.

Error Handling
The API will check if the input data is valid. If it’s not, you’ll get an error message. For example, if you provide a flight pair that doesn’t have both a source and a destination, the server will return a 400 Bad Request with a message like:

json
Copy code
{
  "error": "Flights should be an array of valid airport pairs."
}
Similarly, if the flight list doesn’t make sense (like if there’s no clear starting point), the server will return an error explaining the issue.

Running Tests
To run the tests, you can use the following command:

bash
Copy code
npm test
This will check that everything works as expected, including how the app handles flight data and error cases.

Environment Variables
PORT: The port the server listens on. By default, it’s set to 8080, but you can change it if needed.
NODE_ENV: The environment in which the app is running. Set this to test for running tests, or production for the live environment.
Contributing
Feel free to contribute! If you have ideas for new features or spot any bugs, here’s how you can help:

Fork the repository.
Create a new branch (git checkout -b feature-name).
Make your changes and commit them (git commit -m 'Add some feature').
Push to your branch (git push origin feature-name).
Open a pull request, and we'll take a look.
License
This project is licensed under the MIT License. Check out the LICENSE file for more details.
