'use strict';

// https://github.com/legend80s/long2ip

export const numberToIp = (ip: number): string => {
    return [ip >>> 24, ip >>> 16 & 0xFF, ip >>> 8 & 0xFF, ip & 0xFF].join('.');
};
