# CemTrak Event Log API
![](./hype-image.jpeg)
### Part of the [CemTrak project](https://github.com/mring33621/CemTrak)
### Open Source Carbon Emissions Tracker
### A [Fastify](https://fastify.dev/) API to record Emitter state time series data in a SQLite table

### Example:
POST localhost:8989/events
{ "external_id": "E001", "state": "high", "timestamp": "2022-09-27 18:00:00.000" }

### Details:
- external_id is a string of max 255 length 
- state is one of "high", "med", "low", "off"
- timestamp is optional, ISO 8601 format