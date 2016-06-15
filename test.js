'use strong';

const requireBowerFiles = require('require-bower-files');
const requireFromString = require('require-from-string');
const rollup = require('rollup');
const rollupNodeResolve = require('rollup-plugin-node-resolve');
const test = require('tape');

global.window = {};
requireBowerFiles({self: true});

function runTest(parseTzdataCoordinate, description) {
  test(description, t => {
    t.strictEqual(parseTzdataCoordinate.name, 'parseTzdataCoordinate', 'should have a function name.');

    t.deepEqual(
      parseTzdataCoordinate('+1440-01726'),
      {
        latitude: {
          sign: '+',
          degree: 14,
          minute: 40
        },
        longitude: {
          sign: '-',
          degree: 17,
          minute: 26
        }
      },
      'should parse +-DDMM+-DDDMM string.'
    );

    t.deepEqual(
      parseTzdataCoordinate('+515248-1763929'),
      {
        latitude: {
          sign: '+',
          degree: 51,
          minute: 52,
          second: 48
        },
        longitude: {
          sign: '-',
          degree: 176,
          minute: 39,
          second: 29
        }
      },
      'should parse +-DDMMSS+-DDDMMSS string.'
    );

    t.throws(
      () => parseTzdataCoordinate(true),
      /^TypeError.*true is not a string\. Expected a string in tzdata coordinate format, /,
      'should throw a type error when it takes a non-string argument.'
    );

    t.throws(
      () => parseTzdataCoordinate(),
      /^TypeError.*undefined is not a string\. .*for example `-2439\+02555`\./,
      'should throw a type error when it takes no arguments.'
    );

    t.throws(
      () => parseTzdataCoordinate(''),
      /^Error.*Received an empty string\. Expected a string in tzdata coordinate format, /,
      'should throw an error when it takes an empty string.'
    );

    t.throws(
      () => parseTzdataCoordinate('foo'),
      /^Error.*foo is not a valid coordinate\. Expected a string in tzdata coordinate format, /,
      'should throw a type error when it takes no arguments.'
    );

    t.end();
  });
}

rollup.rollup({
  entry: require('./package.json')['jsnext:main'],
  plugins: rollupNodeResolve({jsnext: true})
}).then(bundle => {
  runTest(require('.'), 'require(\'parse-tzdata-coordinate\')');
  runTest(global.window.parseTzdataCoordinate, 'window.parseTzdataCoordinate');
  runTest(requireFromString(bundle.generate({format: 'cjs'}).code), 'Module exports');
});
