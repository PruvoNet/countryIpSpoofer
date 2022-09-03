[![Npm Version](https://img.shields.io/npm/v/country-ip-spoofer.svg?style=popout)](https://www.npmjs.com/package/country-ip-spoofer)
[![Build Status](https://travis-ci.org/PruvoNet/countryIpSpoofer.svg?branch=master)](https://travis-ci.org/PruvoNet/countryIpSpoofer)
[![Test Coverage](https://api.codeclimate.com/v1/badges/64f26f52c548c8d1e010/test_coverage)](https://codeclimate.com/github/PruvoNet/countryIpSpoofer/test_coverage)
[![Maintainability](https://api.codeclimate.com/v1/badges/64f26f52c548c8d1e010/maintainability)](https://codeclimate.com/github/PruvoNet/countryIpSpoofer/maintainability)
[![Known Vulnerabilities](https://snyk.io/test/github/PruvoNet/countryIpSpoofer/badge.svg?targetFile=package.json)](https://snyk.io/test/github/PruvoNet/countryIpSpoofer?targetFile=package.json)
[![dependencies Status](https://david-dm.org/PruvoNet/countryIpSpoofer/status.svg)](https://david-dm.org/PruvoNet/countryIpSpoofer)
[![devDependencies Status](https://david-dm.org/PruvoNet/countryIpSpoofer/dev-status.svg)](https://david-dm.org/PruvoNet/countryIpSpoofer?type=dev)

# country-ip-spoofer
A fully typed Node.js module that generates a random IP address that is associated with a desired country.

This module is especially useful if you use an API that requires an IP address to be passed to it in order to realize 
the country of a user, and you want to spoof the user country. 

## Important notes

This module leverages the [IP2Location™](https://lite.ip2location.com/database/ip-country) data set, which is 
licensed under [Creative Commons Attribution-ShareAlike 4.0](https://creativecommons.org/licenses/by-sa/4.0/).   
As such, the module does not package the actual data, and you are responsible to load it to the module while not 
infringing with said licence. 

* For better results, refresh your data set once in a while.

## Installation 
```sh
npm install country-ip-spoofer
```
Or
```sh
yarn add country-ip-spoofer
```

## Setup

Before you begin, you need to prepare the data set to be used by the module (only perform once).  

Please download the `IPV4 CSV` file from [IP2Location™](https://lite.ip2location.com/database/ip-country) and run 
the following temp script (install the `csv` package if it is missing - you can delete it later):

```typescript
import {createDataTable} from 'country-ip-spoofer/dist/dataTableCreator';

const csfFile = 'path to the downloaded csv file';
const outputFile = 'path to output the data set';

createDataTable(csfFile, outputFile)
    .then(() => {
        console.log('done');
    });
```

Then save the output file to your project.

## Usage

```typescript
import * as request from 'request'; // We only use this to test the resulting ips
import { getIpOfCountry, setDataTable, DataTable } from 'country-ip-spoofer';
import * as dataSet from 'path to your json data set form previous step';

// Load the data set before yuo begin
setDataTable(dataSet as DataTable);

const countryCode = 'AU';

const ip = getIpOfCountry(countryCode);
console.log(ip); // prints '103.246.130.28' for example

// Test out the ip location
const requestParams = {
    url: `http://ip-api.com/json/${ip}`,
    json: true,
};
request(requestParams, (err, result) => {
    const realCountryCode = result.toJSON().body.countryCode;
    console.log(realCountryCode); // Should print 'AU'
    console.log(realCountryCode === countryCode ? 'Success' : 'Fail'); // Should print 'Success'
});
```
