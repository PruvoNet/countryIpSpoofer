'use strict';

// http://download.ip2location.com/lite/
// https://lite.ip2location.com/database/ip-country

import {numberToIp} from './numberToIp';
import {DataTable, IIpRange} from './types';

export * from './types';
export {createDataTable} from './dataTableCreator';

let dataTable: DataTable | undefined;

export const setDataTable = (_dataTable: DataTable) => {
    dataTable = _dataTable;
};

const randomInt = (from: number, to: number): number => {
    return Math.floor(Math.random() * (to - from) + from);
};

const generateIpFromRange = (entries: IIpRange[]): string => {
    const entry = entries[randomInt(0, entries.length)];
    const ipNumber = randomInt(entry.ipFrom, entry.ipTo);
    return numberToIp(ipNumber);
};

export const getIpOfCountry = (countryCode: string): string | undefined => {
    countryCode = countryCode && countryCode.toUpperCase();
    if (!countryCode) {
        throw new Error(`countryCode argument is mandatory`);
    }
    if (!dataTable) {
        throw new Error(`Data table was not loaded yet`);
    }
    const entries = dataTable[countryCode];
    if (!entries || entries.length === 0) {
        throw new Error(`No matching country ${countryCode}`);
    }
    return generateIpFromRange(entries);
};
