const examples = require('./examples.json')
const codec = require('./index');

var decodeDate = codec.decodeDate;
var timeCounterToSeconds = codec.timeCounterToSeconds;
var decodeTemperature = codec.decodeTemperature;
var decodeSerialNumber = codec.decodeSerialNumber;

var decodeUplink = codec.decodeUplink;
var encodeDownlink = codec.encodeDownlink;
var decodeDownlink = codec.decodeDownlink;


describe('compactDateToString', () => {
  test('should convert compact date to string', () => {
    expect(decodeDate([0xB6, 0x32])).toBe('22/05/2025');
    expect(decodeDate([0xE3, 0x32])).toBe('03/07/2025');
    expect(decodeDate([0xC6, 0x32])).toBe('06/06/2025');
  });
});

describe('timeCounterToSeconds', () => {
  test('should convert a value in seconds', () => {
    expect(timeCounterToSeconds([0x04, 0x05])).toBe(321);
    expect(timeCounterToSeconds([0xf8, 0x03])).toBe(254);
  });

  test('should convert a value in minutes', () => {
    expect(timeCounterToSeconds([0x05, 0x05])).toBe(321 * 60);
    expect(timeCounterToSeconds([0x09, 0x1a])).toBe(1666 * 60);
  });

  test('should convert a value in hours', () => {
    expect(timeCounterToSeconds([0x06, 0x05])).toBe(321 * 3600);
    expect(timeCounterToSeconds([0x5e, 0x05])).toBe(343 * 3600);
  });

  test('should convert value in days', () => {
    expect(timeCounterToSeconds([0x07, 0x05])).toBe(321 * 86400);
    expect(timeCounterToSeconds([0xe3, 0x42])).toBe(4280 * 86400);

  });
});

describe('decodeSerialNumber', () => {
  test('should decode byte array to hex string', () => {
    expect(decodeSerialNumber([0x88, 0x21, 0x00, 0x00])).toBe('00002188');
    expect(decodeSerialNumber([0x25, 0x91, 0x56, 0x34])).toBe('34569125');
    expect(decodeSerialNumber([0x05, 0x36, 0x04, 0x00])).toBe('00043605');
  });
});

describe('decodeTemperature', () => {
  test('should decode a positive temperature', () => {
    expect(decodeTemperature(0xE2)).toBe(-30);
    expect(decodeTemperature(0x19)).toBe(25);
  });
});


describe('decodeUplink, encodeDownlink and decodeDownlink', () => {
  const func_dict = {
    "uplink": decodeUplink,
    "downlink-encode": encodeDownlink,
    "downlink-decode": decodeDownlink,
  }
  examples.map((example) => {
    test(example.description, () => {
      expect(func_dict[example.type](example.input)).toEqual(example.output);
    });
  });
});