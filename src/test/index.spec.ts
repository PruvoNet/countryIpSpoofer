'use strict';

import {expect} from 'chai';
import {DataTable, getIpOfCountry, setDataTable} from '../';

const dataTable: DataTable = {
    '-': [
        {
            'ipFrom': 0,
            'ipTo': 16777215,
        },
    ],
    'US': [
        {
            'ipFrom': 16777216,
            'ipTo': 16777471,
        },
        {
            'ipFrom': 16843008,
            'ipTo': 16843263,
        },
    ],
    'CN': [
        {
            'ipFrom': 16777472,
            'ipTo': 16778239,
        },
    ],
    'AU': [
        {
            'ipFrom': 16778240,
            'ipTo': 16779263,
        },
    ],
    'DE': [],
};

describe('get ip of country', () => {

    beforeEach(() => {
        setDataTable(dataTable);
    });

    it('get ip of country', () => {
        const ip = getIpOfCountry('AU');
        expect(ip!.length).to.not.eql(0);
    });

    it('get ip of country lower case', () => {
        const ip = getIpOfCountry('au');
        expect(ip!.length).to.not.eql(0);
    });

    it('get ip of country with multiple ranges', () => {
        const ip = getIpOfCountry('US');
        expect(ip!.length).to.not.eql(0);
    });

    it('should fail if no country code given', () => {
        try {
            // @ts-ignore
            const ip = getIpOfCountry();
            throw new Error('should not get here');
        } catch (e) {
            expect(e.message).to.eql(`countryCode argument is mandatory`);
        }
    });

    it('should fail if no data table code loaded', () => {
        // @ts-ignore
        setDataTable();
        try {
            const ip = getIpOfCountry('US');
            throw new Error('should not get here');
        } catch (e) {
            expect(e.message).to.eql(`Data table was not loaded yet`);
        }
    });

    it('should fail if no entry for country', () => {
        try {
            const ip = getIpOfCountry('IL');
            throw new Error('should not get here');
        } catch (e) {
            expect(e.message).to.eql(`No matching country IL`);
        }
    });

    it('should fail if empty entry for country', () => {
        try {
            const ip = getIpOfCountry('DE');
            throw new Error('should not get here');
        } catch (e) {
            expect(e.message).to.eql(`No matching country DE`);
        }
    });

});
