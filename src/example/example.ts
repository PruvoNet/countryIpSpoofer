'use strict';

import {getIpOfCountry, setDataTable, DataTable} from '../';
import {createDataTable} from '../dataTableCreator';
import * as request from 'request';
import * as fs from 'fs';

const csfFile = './dataSet.csv';
const outputFile = './dataTable.json';

createDataTable(csfFile, outputFile)
    .then(() => {
        const dataSet: DataTable = JSON.parse(fs.readFileSync(outputFile, 'UTF-8'));
        setDataTable(dataSet);
        const countryCode = 'AU';
        const ip = getIpOfCountry(countryCode);
        console.log(ip);
        const requestParams = {
            url: `http://ip-api.com/json/${ip}`,
            json: true,
        };
        request(requestParams, (err: any, result: any) => {
            const realCountryCode = result.toJSON().body.countryCode;
            console.log(realCountryCode);
            console.log(realCountryCode === countryCode ? 'Success' : 'Fail');
        });
    });
