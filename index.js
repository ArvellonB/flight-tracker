const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

// Function to sort flights
function sortFlights(flights) {
    const flightMap = new Map();
    const destinationSet = new Set();

    flights.forEach(([src, dest]) => {
        flightMap.set(src, dest);
        destinationSet.add(dest);
    });

    let start = null;
    for (const [src] of flightMap) {
        if (!destinationSet.has(src)) {
            start = src;
            break;
        }
    }

    const flightPath = [];
    while (start) {
        flightPath.push(start);
        start = flightMap.get(start);
    }

    return flightPath;
}

// Endpoint to handle flight path calculation
app.post('/calculate', (req, res) => {
    const { flights } = req.body;
    if (!Array.isArray(flights)) {
        return res.status(400).json({ error: 'Flights should be an array of pairs.' });
    }
    const sortedPath = sortFlights(flights);
    res.json(sortedPath);
});

// Export the sortFlights function for testing
module.exports = { app, sortFlights };

// Only start the server if not in a test environment
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Flight Tracker API is running on port ${PORT}`);
    });
}
