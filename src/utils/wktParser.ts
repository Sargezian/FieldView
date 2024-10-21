export const parseWKTPolygon = (polygonWKT: string): Array<[number, number]> => {

    const coordinates = polygonWKT
        .replace('POLYGON((', '')
        .replace('))', '')
        .split(',')
        .map(item => {
            const [lat, lng] = item.trim().split(' ').map(Number);
            return [lat, lng] as [number, number];
        });
    return coordinates;
};

// Converts polygon data, from WKT (Well-Known Text) format, into an array of coordinate pairs).

// removes "POLYGON(("  "))" and splits on comma
// now looks like this "56.1737414081028 9.98770276780371"

// .map() function iterates over each coordinate pair.
// Trims any excess whitespace using .trim().
// Splits the string into two parts (latitude and longitude) based on the space (' '),
// converting both parts from strings to numbers using .map(Number).

// Latitudes are horizontal lines
// Longitudes are vertical lines
