'use strict';

import * as fs from 'fs';
// @ts-ignore
import * as csv from 'csv';
import {DataTable, IIpRange} from './types';

const transformer = (dataTable: DataTable) => (ipRow: string[]) => {
    try {
        const countryCode = ipRow[2].toUpperCase();
        const range: IIpRange = {
            ipFrom: parseInt(ipRow[0], 10),
            ipTo: parseInt(ipRow[1], 10),
        };
        const entry = dataTable[countryCode] || [];
        entry.push(range);
        dataTable[countryCode] = entry;
    } catch (e) {
        throw new Error(`Malformed csv entry: ${e.message}`);
    }
};

export const createDataTable = (ipLocationFilePath: string, dataTableFilePath: string): Promise<void> => {
    const dataTable: DataTable = {};
    return new Promise((resolve, reject) => {
        const onEnd = () => {
            fs.writeFile(dataTableFilePath, JSON.stringify(dataTable), (err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        };
        const onError = (err: any) => {
            reject(err);
        };
        fs.createReadStream(ipLocationFilePath)
            .on('error', onError)
            .pipe(csv.parse({delimiter: ',', relax: true}))
            .on('error', onError)
            .pipe(csv.transform(transformer(dataTable)))
            .on('error', onError)
            .on('end', onEnd)
            .on('finish', onEnd);
    });
};
