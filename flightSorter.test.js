const { sortFlights } = require('./index'); // Import the function from index.js

test('sorts flights correctly', () => {
    const flights = [['IND', 'EWR'], ['SFO', 'ATL'], ['GSO', 'IND'], ['ATL', 'GSO']];
    expect(sortFlights(flights)).toEqual(['SFO', 'ATL', 'GSO', 'IND', 'EWR']); // Expect full flight path
});
