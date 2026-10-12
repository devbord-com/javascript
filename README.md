# devbord for JavaScript

Error tracking, performance and cron monitoring for web apps and Node.js, on [devbord](https://devbord.com).

| Package | For |
|---|---|
| [`@devbord/browser`](browser) | Web apps: any framework, or none |
| [`@devbord/node`](node) | Node.js servers, workers and scripts |

Both are thin layers over the Sentry SDK for that platform (`@sentry/browser`, `@sentry/node`), pinned to a version
that is tested against devbord. Everything those SDKs export is exported here under the same name, so their
documentation applies and moving over is a change of the import. Only `init` differs: see [What init changes](#what-init-changes).

## Browser

```bash
npm install @devbord/browser
```

```js
import * as Devbord from '@devbord/browser';

Devbord.init({
  dsn: 'https://<key>@devbord.com/<project>',
  release: 'my-app@1.4.0',
  environment: 'production',
});
```

Call `init` before the rest of the app loads. Uncaught errors and rejected promises are reported from then on; report
a caught one with `Devbord.captureException(error)`.

For performance, add the tracing integration and a sample rate:

```js
Devbord.init({
  dsn: '…',
  integrations: [Devbord.browserTracingIntegration()],
  tracesSampleRate: 0.1,
});
```

## Node.js

```bash
npm install @devbord/node
```

Put the setup in a file of its own, so it runs before the modules it has to watch are loaded:

```js
// instrument.js
const Devbord = require('@devbord/node');

Devbord.init({ tracesSampleRate: 0.1 });
```

```bash
DEVBORD_DSN=https://<key>@devbord.com/<project> node --require ./instrument.js server.js
```

With ES modules, write the file with `import * as Devbord from '@devbord/node'` and start with
`node --import ./instrument.mjs server.mjs`.

`init` reads what you leave out from the environment:

| Variable | Option |
|---|---|
| `DEVBORD_DSN` | `dsn` |
| `DEVBORD_RELEASE` | `release` |
| `DEVBORD_ENVIRONMENT` | `environment` |

A scheduled job reports to a monitor with `Devbord.withMonitor('nightly-export', () => run())`.

## What init changes

- **Less personal data by default.** User details (such as the IP address), cookies and request bodies are not
  collected. Turn them on one by one with `dataCollection`, for example `dataCollection: { cookies: true }`.
- **Nothing devbord does not store.** Session replays, profiles, logs and metrics are not sent. A replay or profiling
  integration you pass is left out, with a line in the console.
- **No client reports**, the SDK's own statistics about dropped events.
- Events carry `devbord.javascript.browser` or `devbord.javascript.node` as the name of the SDK.

Every other option is passed on unchanged.

## Readable stack traces

Upload the source maps of each build with the [release action](https://github.com/devbord-com/release-action), and
pass the same `release` to `init`.

## Moving from a Sentry SDK

Replace the package and the import, and put the DSN of your devbord project in `init`:

```diff
-import * as Sentry from '@sentry/browser';
+import * as Sentry from '@devbord/browser';
```

A framework package such as `@sentry/react` or `@sentry/nextjs` works with a devbord DSN as it is; these two packages
cover the plain browser and Node.js SDKs.

## Licence

MIT. The Sentry SDKs these packages build on are MIT-licensed as well, © Functional Software, Inc.
