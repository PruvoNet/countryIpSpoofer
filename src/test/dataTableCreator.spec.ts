'use strict';

import * as fs from 'fs';
import tempFile = require('tempfile');
import {expect} from 'chai';
import {createDataTable} from '../';
import {DataTable} from '../types';

describe('data table creator', () => {

    it('should create data table from ip table csv', () => {
        const tempCsv = tempFile('.csv');
        const tempJson = tempFile('.json');
        fs.writeFileSync(tempCsv, `"0","16777215","-","-"
"16777216","16777471","US","United States"
"16777472","16778239","CN","China"
"16778240","16779263","AU","Australia"
"16843008","16843263","US","United States"
`);
        return createDataTable(tempCsv, tempJson)
            .then(() => {
                const data: DataTable = JSON.parse(fs.readFileSync(tempJson, 'UTF-8'));
                expect(data.US[0].ipFrom).to.eql(16777216);
                expect(data.US[0].ipTo).to.eql(16777471);
                expect(data.US[1].ipFrom).to.eql(16843008);
                expect(data.US[1].ipTo).to.eql(16843263);
                expect(data.CN[0].ipFrom).to.eql(16777472);
                expect(data.CN[0].ipTo).to.eql(16778239);
                expect(data.AU[0].ipFrom).to.eql(16778240);
                expect(data.AU[0].ipTo).to.eql(16779263);
                expect(data['-'][0].ipFrom).to.eql(0);
                expect(data['-'][0].ipTo).to.eql(16777215);
            });
    });

    it('should fail to create data table if csv file does not exist', () => {
        const tempCsv = tempFile('.csv');
        const tempJson = tempFile('.json');
        return createDataTable(tempCsv, tempJson)
            .then(() => {
                throw new Error('should not get here');
            })
            .catch((err) => {
                expect(err.message).to.eql(`ENOENT: no such file or directory, open '${tempCsv}'`);
            });
    });

    it('should fail to create data table if output file does not exist', () => {
        const tempCsv = tempFile('.csv');
        const tempJson = tempFile('.json');
        fs.writeFileSync(tempCsv, `"0","16777215","-","-"
"16777216","16777471","US","United States"
"16777472","16778239","CN","China"
"16778240","16779263","AU","Australia"
"16843008","16843263","US","United States"
`);
        fs.writeFileSync(tempJson, 'dummy');
        fs.chmodSync(tempJson, '007');
        return createDataTable(tempCsv, tempJson)
            .then(() => {
                throw new Error('should not get here');
            })
            .catch((err) => {
                expect(err.message).to.eql(`EACCES: permission denied, open '${tempJson}'`);
            });
    });

    it('should fail to create data table if ill-formed csv file', () => {
        const tempCsv = tempFile('.csv');
        const tempJson = tempFile('.json');
        fs.writeFileSync(tempCsv, `"0","16777215","-","-"
"16777216","16777471","US"
"16777472","16778239","CN","China"
"16778240","16779263","AU","Australia"
"16843008","16843263","US","United States"
`);
        return createDataTable(tempCsv, tempJson)
            .then(() => {
                throw new Error('should not get here');
            })
            .catch((err) => {
                expect(err.message).to.eql(`Number of columns is inconsistent on line 2`);
            });
    });

    it('should fail to create data table if input file has bad format', () => {
        const tempCsv = tempFile('.csv');
        const tempJson = tempFile('.json');
        fs.writeFileSync(tempCsv, `"0","16777215"
"16777216","16777471"
"16777472","16778239"
"16778240","16779263"
"16843008","16843263"
`);
        return createDataTable(tempCsv, tempJson)
            .then(() => {
                throw new Error('should not get here');
            })
            .catch((err) => {
                expect(err.message).to.eql(`Malformed csv entry: Cannot read property 'toUpperCase' of undefined`);
            });
    });

});
