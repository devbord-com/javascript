'use strict';

const VERSION = '1.0.0';

// what devbord accepts but does not store
const UNSUPPORTED = { ProfilingIntegration: 'profiles' };

/**
 * @param {import('@sentry/node').Integration[]} list
 * @returns {import('@sentry/node').Integration[]}
 */
function supported(list) {
  return list.filter((i) => {
    if (!i || !UNSUPPORTED[i.name]) return true;
    console.warn(`[devbord] ${i.name} was left out: devbord does not store ${UNSUPPORTED[i.name]}`);
    return false;
  });
}

/**
 * Turns the options given to `init` into the options for `@sentry/node`.
 * @param {import('@sentry/node').NodeOptions} [options]
 * @param {string} sentryVersion version of `@sentry/node` in use
 * @returns {import('@sentry/node').NodeOptions}
 */
function devbordOptions(options = {}, sentryVersion) {
  const { integrations } = options;
  return {
    sendClientReports: false,
    ...options,
    dsn: options.dsn || process.env.DEVBORD_DSN,
    release: options.release || process.env.DEVBORD_RELEASE,
    environment: options.environment || process.env.DEVBORD_ENVIRONMENT,
    dataCollection: { userInfo: false, cookies: false, httpBodies: [], ...options.dataCollection },
    profileSessionSampleRate: 0,
    beforeSendLog: () => null,
    beforeSendMetric: () => null,
    integrations: (defaults) => supported(typeof integrations === 'function' ? integrations(defaults) : [...defaults, ...(integrations || [])]),
    _metadata: {
      sdk: {
        name: 'devbord.javascript.node',
        version: VERSION,
        packages: [{ name: 'npm:@devbord/node', version: VERSION }, { name: 'npm:@sentry/node', version: sentryVersion }],
      },
    },
  };
}

module.exports = { VERSION, devbordOptions };
