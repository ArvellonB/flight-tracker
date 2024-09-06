const { getStartAndEnd, getFullPath } = require('./index');

describe('Flight Sorting Functions', () => {
    let flights;

    beforeEach(() => {
        flights = [
            ['IND', 'EWR'],
            ['SFO', 'ATL'],
            ['GSO', 'IND'],
            ['ATL', 'GSO']
        ];
    });

    test('returns start and end airports for a multi-leg flight', () => {
        const result = getStartAndEnd(flights);
        expect(result).toEqual(['SFO', 'EWR']);
    });

    test('returns the complete flight path with layovers', () => {
        const result = getFullPath(flights);
        expect(result).toEqual(['SFO', 'ATL', 'GSO', 'IND', 'EWR']);
    });

    test('handles a single flight and returns correct start and end', () => {
        const singleFlight = [['SFO', 'EWR']];
        expect(getStartAndEnd(singleFlight)).toEqual(['SFO', 'EWR']);
        expect(getFullPath(singleFlight)).toEqual(['SFO', 'EWR']);
    });

    test('returns null for start and end when no flights are provided', () => {
        expect(getStartAndEnd([])).toEqual([null, null]);
        expect(getFullPath([])).toEqual([]);
    });

    test('handles unordered flights and returns the correct full path and endpoints', () => {
        const unorderedFlights = [
            ['ATL', 'GSO'],
            ['SFO', 'ATL'],
            ['IND', 'EWR'],
            ['GSO', 'IND']
        ];
        expect(getStartAndEnd(unorderedFlights)).toEqual(['SFO', 'EWR']);
        expect(getFullPath(unorderedFlights)).toEqual(['SFO', 'ATL', 'GSO', 'IND', 'EWR']);
    });

    test('throws error for invalid flight data', () => {
        const invalidFlights = [['SFO'], ['ATL', 'JFK']];
        expect(() => getStartAndEnd(invalidFlights)).toThrow('Invalid flight data');
        expect(() => getFullPath(invalidFlights)).toThrow('Invalid flight data');
    });
});