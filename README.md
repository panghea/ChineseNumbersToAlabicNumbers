ChineseNumbersToAlabicNumbers
=============================
[![Build Status](https://travis-ci.org/panghea/ChineseNumbersToAlabicNumbers.svg?branch=master)](https://travis-ci.org/panghea/ChineseNumbersToAlabicNumbers)

 Chinese Numbers convert to Alabic Numbers.

 Easy to use.

 ```javascript
var converter = new ChnNumConverter();    
console.log(converter.convertToAlabic("20����S���S"));
 ```
logs
 ```bash
 20000002000100
 ```

run tests.
```bash
npm install -g grunt-cli
npm install
grunt unit
```

