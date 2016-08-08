# parse-tzdata-coordinate

[![NPM version](https://img.shields.io/npm/v/parse-tzdata-coordinate.svg)](https://www.npmjs.com/package/parse-tzdata-coordinate)
[![Bower version](https://img.shields.io/bower/v/parse-tzdata-coordinate.svg)](https://github.com/shinnn/parse-tzdata-coordinate/releases)
[![Build Status](https://travis-ci.org/shinnn/parse-tzdata-coordinate.svg?branch=master)](https://travis-ci.org/shinnn/parse-tzdata-coordinate)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/parse-tzdata-coordinate.svg)](https://coveralls.io/github/shinnn/parse-tzdata-coordinate?branch=master)
[![dependencies Status](https://david-dm.org/shinnn/parse-tzdata-coordinate/status.svg)](https://david-dm.org/shinnn/parse-tzdata-coordinate)
[![devDependencies Status](https://david-dm.org/shinnn/parse-tzdata-coordinate/dev-status.svg)](https://david-dm.org/shinnn/parse-tzdata-coordinate?type=dev)

Parse a coordinate string in [`zone.tab`](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) format

```javascript
import parseTzdataCoordinate from 'parse-tzdata-coordinate';

parseTzdataCoordinate('+394606-0860929');
/*
  => {
    latitude: {
      sign: '+',
      degree: 39,
      minute: 46,
      second: 6
    },
    longitude: {
      sign: '-',
      degree: 86,
      minute: 9,
      second: 29
    }
  }
*/
```

## Installation

### [npm](https://www.npmjs.com/)

```
npm install parse-tzdata-coordinate
```

### [Bower](https://bower.io/)

```
bower install parse-tzdata-coordinate
```

## API

### parseTzdataCoordinate(*str*)

*str*: `String`  
Return: `Object`

It takes a string of time zone coordinates in [tz database](https://www.iana.org/time-zones) format:

> Latitude and longitude of the zone's principal location in [ISO 6709](https://www.iso.org/iso/catalogue_detail.htm?csnumber=39242) sign-degrees-minutes-seconds format, either `+-DDMM+-DDDMM` or `+-DDMMSS+-DDDMMSS`, first latitude (`+` is north), then longitude (`+` is east).

and returns an object in the form:

```
{
  latitude: {
    sign: <string> ('+' or '-'),
    degree: <int>,
    minute: <int>,
    [second: <int>] (if available)
  },
  longitude: {
    sign: <string> ('+' or '-'),
    degree: <int>,
    minute: <int>,
    [second: <int>] (if available)
  }
}
```

```javascript
parseTzdataCoordinate('+394606-0860929');
/*
  => {
    latitude: {
      sign: '+',
      degree: 34,
      minute: 31
    },
    longitude: {
      sign: '+',
      degree: 69,
      minute: 12
    }
  }
*/
```

## License

Copyright (c) 2016 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](./LICENSE).
