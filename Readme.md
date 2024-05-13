# CemTrak Event Log API
![](./hype-image.jpeg)
### Part of the [CemTrak project](https://github.com/mring33621/CemTrak)
### Open Source Carbon Emissions Tracker
### A [Fastify](https://fastify.dev/) API to record Emitter state time series data in a SQLite table

### API Examples:
```
POST localhost:8989/events
{ "external_id": "E001", "state": "high", "timestamp": "2022-09-27 18:00:00.000" }
should return {"message": "OK"} or {"error": "some error message"}
```
```
GET localhost:8989/events/datadump
returns:
external_id,state,timestamp
E001,off,2024-05-12 00:01:00.000
E002,off,2024-05-12 00:01:00.000
C001,off,2024-05-12 00:01:00.000
E001,low,2024-05-12 09:01:00.000
E001,med,2024-05-12 10:17:00.000
E001,high,2024-05-12 12:42:00.000
E002,low,2024-05-12 13:34:00.000
E002,med,2024-05-12 16:54:00.000
E002,high,2024-05-12 17:15:00.000
C001,high,2024-05-12 23:01:00.000
E001,off,2024-05-13 00:01:00.000
C001,off,2024-05-13 03:01:00.000
```

### Details:
- POST endpoint inserts new record
  - external_id is a string of max 255 length 
  - state is one of "high", "med", "low", "off"
  - timestamp is optional, ISO 8601 format
- GET endpoint returns all records, sorted by timestamp ASC, in CSV format