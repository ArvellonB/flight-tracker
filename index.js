const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());

function buildFlightMap(flights) {
    if (flights.length === 0) return { flightMap: new Map(), start: null };

    const flightMap = new Map();
    const destinations = new Set();

    flights.forEach(([src, dest]) => {
        if (!src || !dest) {
            throw new Error('Invalid flight data: each flight must have both source and destination.');
        }
        flightMap.set(src, dest);
        destinations.add(dest);
    });

    const start = [...flightMap.keys()].find(src => !destinations.has(src));
    if (!start) throw new Error('Invalid flight data: unable to find start airport.');

    return { flightMap, start };
}

function getStartAndEnd(flights) {
    if (flights.length === 0) return [null, null];

    const { flightMap, start } = buildFlightMap(flights);
    let end = start;

    while (flightMap.has(end)) {
        end = flightMap.get(end);
    }

    return [start, end];
}

function getFullPath(flights) {
    if (flights.length === 0) return [];

    const { flightMap, start } = buildFlightMap(flights);
    const path = [];

    let current = start;
    while (current) {
        path.push(current);
        current = flightMap.get(current);
    }

    return path;
}

app.post('/calculate-start-end', (req, res) => {
    const { flights } = req.body;
    if (!Array.isArray(flights) || !flights.every(flight => Array.isArray(flight) && flight.length === 2)) {
        return res.status(400).json({ error: 'Flights should be an array of valid airport pairs.' });
    }

    try {
        const result = getStartAndEnd(flights);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.post('/calculate-full-path', (req, res) => {
    const { flights } = req.body;
    if (!Array.isArray(flights) || !flights.every(flight => Array.isArray(flight) && flight.length === 2)) {
        return res.status(400).json({ error: 'Flights should be an array of valid airport pairs.' });
    }

    try {
        const result = getFullPath(flights);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

module.exports = { app, getStartAndEnd, getFullPath };