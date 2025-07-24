# TG563A Smoke Detector LoRaWAN Codec

This JavaScript codec decodes and encodes LoRaWAN payloads for the **TG563A Smoke Detector**. It supports uplink and downlink message parsing, making it suitable for integration with LoRaWAN platforms like **The Things Stack**, **ChirpStack**, and others.

## 📖 Documentation

The product documentation is available [here](docs/SE000304A_TG563A_Technical_Reference_Manual.pdf).


## 📦 Features

- **Uplink Decoder**: Parses sensor data including smoke alarms, battery status, temperature, hardware diagnostics, serial number, production/installation dates, counters...
- **Downlink Encoder/Decoder**: Supports configuration commands for transmission period, event enabling, and more.

## 📁 Files

- `index.js`: Contains all codec logic for uplink decoding, downlink encoding, and downlink decoding.
- `test.js`: Contains a set of unit tests.
- `examples.json`: Contains a set of examples (uplinks and downlinks).

## 🧪 Uplink Decoder

### Function
```js
decodeUplink(input)
```

### Input
```json
{
  "bytes": [1, 126, 21, 0, 1],
  "fPort": 1
}
```

### Output
```json
{
  "data": {
    "messageType": "Smoke Alarm Event",
    "configuration": {
      "rawValue": "7E",
      "transmissionPeriod": 24,
      "additionalDataEnabled": 1,
      "obstructionEventEnabled": 1,
      "hardwareFailureEventEnabled": 1,
      "smokeEventEnabled": 1
    },
    "temperature": 21,
    "status": {
      "mounted": 0,
      "brightness": 0,
      "temperatureOutOfRange": 0,
      "obstacleDetected": 0,
      "airInletCovered": 0,
      "tooLongInactivity": 0,
      "tooLongUnmounted": 0,
      "smokeAlarm": 1,
      "batteryLow": 0,
      "smokeChamberFailure": 0,
      "fouledSmokeChamber": 0,
      "ultrasonicSensorFailure": 0,
      "infraredSensorFailure": 0,
      "buzzerFailure": 0
    }
  }
}
```

## 📤 Downlink Encoder

### Function
```js
encodeDownlink(input)
```

### Input
```json
{
  "data": [
    { "command": "SET_TX_PERIOD", "parameter": 2 },
    { "command": "ENABLE_ADDITIONAL_DATA", "parameter": 1 }
  ]
}
```

### Output
```json
{
  "fPort": 1,
  "bytes": [2, 17]
}
```

## 📥 Downlink Decoder

### Function
```js
decodeDownlink(input)
```

### Input
```json
{
  "fPort": 1,
  "bytes": [2, 17]
}
```

### Output
```json
{
  "data": [
    { "command": "SET_TX_PERIOD", "parameter": 2 },
    { "command": "ENABLE_ADDITIONAL_DATA", "parameter": 1 }
  ]
}
```

## 🧩 Utilities

- `decodeTemperature(value)`
- `decodeSerialNumber(byteArray)`
- `decodeDate(byteArray)`
- `timeCounterToSeconds(byteArray)`

## 📜 License

MIT License