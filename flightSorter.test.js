const { sortFlightsStartAndEnd, sortFlightsFullPath } = require('./index');

describe('Flight Sorting Functions', () => {

    // Test for start and end points
    test('sorts flights and returns start and end points', () => {
        const flights = [
            ['IND', 'EWR'],
            ['SFO', 'ATL'],
            ['GSO', 'IND'],
            ['ATL', 'GSO']
        ];

        const result = sortFlightsStartAndEnd(flights);
        expect(result).toEqual(['SFO', 'EWR']);  // Expect only start and end points
    });

    // Test for the full flight path (with layovers)
    test('sorts flights and returns full path including layovers', () => {
        const flights = [
            ['IND', 'EWR'],
            ['SFO', 'ATL'],
            ['GSO', 'IND'],
            ['ATL', 'GSO']
        ];

        const result = sortFlightsFullPath(flights);
        expect(result).toEqual(['SFO', 'ATL', 'GSO', 'IND', 'EWR']);  // Expect full flight path
    });

    // Additional test case with single flight (should return the same start and end)
    test('handles a single flight pair (start and end should be the same)', () => {
        const flights = [
            ['SFO', 'EWR']
        ];

        const resultStartEnd = sortFlightsStartAndEnd(flights);
        expect(resultStartEnd).toEqual(['SFO', 'EWR']);  // Start and end only

        const resultFullPath = sortFlightsFullPath(flights);
        expect(resultFullPath).toEqual(['SFO', 'EWR']);  // Full path is the same as start and end
    });

});