import fieldsData from '../data/fields.json';
import growthData from '../data/growthdata.json';
import soilData from '../data/soilanalysis.json';
import {parseWKTPolygon} from '../utils/wktParser';

interface Field {
    id: string;
    name: string;
    polygon: Array<[number, number]>;
}

// Simulates an API call
// to retrieve data
// field, growth, soil analysis combines JSON files:

export const fetchFields = (): Promise<Field[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const fields = fieldsData.fields.map((field: any) => {
                const fieldGrowthData = growthData.fields.find((g: any) => g.id === field.id)?.growthData;
                const fieldSoilData = soilData.fields.find((s: any) => s.id === field.id)?.soilAnalysis;

                const mappedGrowthData = fieldGrowthData
                    ? fieldGrowthData.map((g: any) => ({
                        coordinates: g.coordinates as [number, number],
                        NDVI: g.NDVI,
                    }))
                    : undefined;

                const mappedSoilData = fieldSoilData
                    ? fieldSoilData.map((s: any) => ({
                        coordinates: s.coordinates as [number, number],
                        phValue: s.phValue,
                    }))
                    : undefined;

                return {
                    id: field.id,
                    name: field.name,
                    polygon: parseWKTPolygon(field.polygon),
                    growthData: mappedGrowthData,
                    soilAnalysisData: mappedSoilData,
                };
            });
            resolve(fields);
        }, 1000);
    });
};
