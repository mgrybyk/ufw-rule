# ufw-rule

> Manage ufw rules

## Usage

TODO

## Installation and Running

1. `npm install`
2. `npm run build`
3. `npm run start` (don't forget to set the [environment variables](#environment-variables))

## Environment Variables
```
# SERVER
PORT=8230
AUTH_TOKEN=set your auth token!
```

Environment variables are processed in [config](./src/config/config.ts).
It's also possible to use [.env](https://www.npmjs.com/package/dotenv) file for development.

## Endpoints

- POST `/v1/ufw/rule-add`
```
{
    "type": "allow" | "deny",
    "ipFrom"?: "1.2.3.4",
    "ipTo"?: "4.3.2.1",
    "port"?: "853",
    "proto?": "tcp"
}
```
- POST `/v1/ufw/rule-remove` NOT IMPLEMENTED
- GET `/v1/ufw/rule-list` NOT IMPLEMENTED

### Health Check

- `/health/liveness` - Liveness check
- `/health/readiness` - Readiness check
- `/health` - Combined Health (Readiness and Liveness) checks
