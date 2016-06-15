/*!
 * parse-tzdata-coordinate | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/parse-tzdata-coordinate
*/
var tzdataCoordinateRegex = require('tzdata-coordinate-regex');

var ERR = ' Expected a string in tzdata coordinate format, for example `-2439+02555`.';
var regex = tzdataCoordinateRegex({exact: true});

export default function parseTzdataCoordinate(str) {
  if (typeof str !== 'string') {
    throw new TypeError(String(str) + ' is not a string.' + ERR);
  }

  if (str === '') {
    throw new Error('Received an empty string.' + ERR);
  }

  var matches = regex.exec(str);

  if (matches === null) {
    throw new Error(str + ' is not a valid coordinate.' + ERR);
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
