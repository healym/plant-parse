# plant-parse
![npm (scoped)](https://img.shields.io/npm/v/@mooper/plant-parse.svg)
![npm bundle size](https://img.shields.io/bundlephobia/min/@mooper/plant-parse.svg)

A npm module to parse jsons produced by GroMet Sensor Pods

## Install
```
$ npm install @mooper/plant-parse
```

## Usage
```js
startServer();
//=> server bound to port 5000, parsing and writing jsons to csv files

plantData = { ID: 1234, humidity: 100, light_exposure: 95};
writeToFile(plantData);
//=> csv file 1234.csv contains:
// humidity, light_exposure
// 100, 95
```
