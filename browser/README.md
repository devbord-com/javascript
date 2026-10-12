# @devbord/browser

Error tracking and performance for web apps, on [devbord](https://devbord.com).

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

The package exports everything `@sentry/browser` does, under the same names, with an `init` that fits devbord: less
personal data by default, and no replays, profiles, logs or metrics, which devbord does not store. The full guide is
in the [repository](https://github.com/devbord-com/javascript#readme).
