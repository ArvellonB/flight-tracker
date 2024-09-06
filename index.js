const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

// Function to sort flights and return only the start and end airports
function sortFlightsStartAndEnd(flights) {
    const flightMap = new Map();
    const destinationSet = new Set();

    // Create a map of source -> destination and store destinations
    flights.forEach(([src, dest]) => {
        flightMap.set(src, dest);
        destinationSet.add(dest);
    });

    // Find the starting airport (an airport that is not a destination)
    let start = null;
    for (const [src] of flightMap) {
        if (!destinationSet.has(src)) {
            start = src;
            break;
        }
    }

    // Traverse through the flight path to get the end destination
    let end = start;
    while (flightMap.has(end)) {
        end = flightMap.get(end);
    }

    // Return only the start and end of the journey
    return [start, end];
}

// Function to sort flights and return the full flight path (including layovers)
function sortFlightsFullPath(flights) {
    const flightMap = new Map();
    const destinationSet = new Set();

    // Create a map of source -> destination and store destinations
    flights.forEach(([src, dest]) => {
        flightMap.set(src, dest);
        destinationSet.add(dest);
    });

    // Find the starting airport (an airport that is not a destination)
    let start = null;
    for (const [src] of flightMap) {
        if (!destinationSet.has(src)) {
            start = src;
            break;
        }
    }

    // Build the full flight path
    const flightPath = [];
    while (start) {
        flightPath.push(start);  // Add each airport to the path
        start = flightMap.get(start);
    }

    return flightPath;  // Return the entire flight path, including layovers
}

// Endpoint to handle flight path calculation (start and end only)
app.post('/calculate-start-end', (req, res) => {
    const { flights } = req.body;
    if (!Array.isArray(flights)) {
        return res.status(400).json({ error: 'Flights should be an array of pairs.' });
    }
    const sortedPath = sortFlightsStartAndEnd(flights);
    res.json(sortedPath);
});

// Endpoint to handle flight path calculation (full path with layovers)
app.post('/calculate-full-path', (req, res) => {
    const { flights } = req.body;
    if (!Array.isArray(flights)) {
        return res.status(400).json({ error: 'Flights should be an array of pairs.' });
    }
    const sortedPath = sortFlightsFullPath(flights);
    res.json(sortedPath);
});

// Export the sortFlights functions for testing
module.exports = { app, sortFlightsStartAndEnd, sortFlightsFullPath };

// Only start the server if not in a test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Flight Tracker API is running on port ${PORT}`);
    });
}
