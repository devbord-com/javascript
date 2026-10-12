import * as Sentry from '@sentry/browser';

export * from '@sentry/browser';

export const VERSION = '1.0.0';

// what devbord accepts but does not store; sending it would only cost the visitor bandwidth
const UNSUPPORTED = { Replay: 'session replays', ReplayCanvas: 'session replays', BrowserProfiling: 'profiles' };

/**
 * @param {import('@sentry/browser').Integration[]} list
 * @returns {import('@sentry/browser').Integration[]}
 */
function supported(list) {
  return list.filter((i) => {
    if (!i || !UNSUPPORTED[i.name]) return true;
    console.warn(`[devbord] ${i.name} was left out: devbord does not store ${UNSUPPORTED[i.name]}`);
    return false;
  });
}

/**
 * Starts error tracking for devbord. Takes the options of `@sentry/browser`, with these differences: user details,
 * cookies and request bodies are not collected unless `dataCollection` asks for them, and replays, profiles, logs
 * and metrics are never sent.
 * @param {import('@sentry/browser').BrowserOptions} [options]
 * @returns {import('@sentry/browser').Client | undefined}
 */
export function init(options = {}) {
  const { integrations } = options;
  return Sentry.init({
    sendClientReports: false,
    ...options,
    dataCollection: { userInfo: false, cookies: false, httpBodies: [], ...options.dataCollection },
    profileSessionSampleRate: 0,
    beforeSendLog: () => null,
    beforeSendMetric: () => null,
    integrations: (defaults) => supported(typeof integrations === 'function' ? integrations(defaults) : [...defaults, ...(integrations || [])]),
    _metadata: {
      sdk: {
        name: 'devbord.javascript.browser',
        version: VERSION,
        packages: [{ name: 'npm:@devbord/browser', version: VERSION }, { name: 'npm:@sentry/browser', version: Sentry.SDK_VERSION }],
      },
    },
  });
}
