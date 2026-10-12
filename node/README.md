# @devbord/node

Error tracking, performance and cron monitoring for Node.js apps, on [devbord](https://devbord.com).

```bash
npm install @devbord/node
```

```js
// instrument.js
const Devbord = require('@devbord/node');

Devbord.init({ tracesSampleRate: 0.1 });
```

```bash
DEVBORD_DSN=https://<key>@devbord.com/<project> node --require ./instrument.js server.js
```

The package exports everything `@sentry/node` does, under the same names, with an `init` that fits devbord: the DSN,
release and environment can come from `DEVBORD_DSN`, `DEVBORD_RELEASE` and `DEVBORD_ENVIRONMENT`, less personal data
is collected by default, and profiles, logs and metrics, which devbord does not store, are not sent. The full guide is
in the [repository](https://github.com/devbord-com/javascript#readme).
