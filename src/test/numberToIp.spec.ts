'use strict';

import {expect} from 'chai';
import {numberToIp} from '../numberToIp';

describe('number to ip converter', () => {

    it('should convert ip', () => {
        expect(numberToIp(3221234342)).to.eql('192.0.34.166');
    });

    it('should convert min ip', () => {
        expect(numberToIp(0)).to.eql('0.0.0.0');
    });

    it('should convert max ip', () => {
        expect(numberToIp(4294967295)).to.eql('255.255.255.255');
    });

});
