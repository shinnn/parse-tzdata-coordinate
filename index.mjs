/*!
 * parse-tzdata-coordinate | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/parse-tzdata-coordinate
*/
import appendType from 'append-type';

var ERROR = 'Expected a string in ISO 6709 sign-degrees-minutes(-seconds) format, either +-DDMM+-DDDMM (11 characters) or +-DDMMSS+-DDDMMSS (15 characters), for example \'+2439-02555\' and \'-353916+1394441\'';
var re = /([+-])(.{2})(.{2})()(([+-])(.{3})(.{2}))()/;
var longRe = /([+-])(.{2})(.{2})(.{2})([+-])(.{3})(.{2})(.{2})/;
var properties = ['latitude', 'longitude'];
var numbers = ['degree', 'minutes', 'seconds'];
var propertiesLen = 2;
var numbersLen = 3;

export default function parseTzdataCoordinate(str) {
  if (typeof str !== 'string') {
    throw new TypeError(ERROR + ', but got a non-string value ' + appendType(str) + '.');
  }

  var len = str.length;

  if (len !== 11 && len !== 15) {
    throw new RangeError(ERROR + ', but got ' + len + '-character string ' + str + '.');
  }

  var matches;
  var result = {
    latitude: {
      sign: undefined,
      degree: undefined,
      minutes: undefined
    },
    longitude: {
      sign: undefined,
      degree: undefined,
      minutes: undefined
    }
  };



  if (len !== 11) {
    matches = re.exec(str);
    result =
  } else {
    matches = longRe.exec(str);
    result.latitude.seconds =
  }

  if (!matches) {
    throw new RangeError(ERROR + ', but got an invalid string ' + str + '.');
  }

  var result = {
    latitude: {
      sign: matches[1]
    },
    longitude: {
      sign: matches[5]
    }
  }

  var arrays = [[matches[2], matches[3], matches[4]], [matches[6], matches[7], matches[8]]];

  for (var i = 0; i < propertiesLen; i++) {
    for (var j = 0; j < numbersLen; j++) {

    }
  }

  var latitudeDegree = parseInt(matches[2], 10);

  if (latitudeDegree) {
    if (latitudeDegree < 0) {
      throw new RangeError(ERROR + ', but got an invalid string ' + str + '.');
    }
  }

  if (matches[1] !== undefined) {
    return {
      latitude: {
        sign: matches[1],
        degree: Number(matches[2]),
        minute: Number(matches[3])
      },
      longitude: {
        sign: matches[4],
        degree: Number(matches[5]),
        minute: Number(matches[6])
      }
    };
  }

  return {
    latitude: {
      sign: matches[7],
      degree: Number(matches[8]),
      minute: Number(matches[9]),
      second: Number(matches[10])
    },
    longitude: {
      sign: matches[11],
      degree: Number(matches[12]),
      minute: Number(matches[13]),
      second: Number(matches[14])
    }
  };
}
