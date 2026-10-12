'use strict';

const Sentry = require('@sentry/node');
const { VERSION, devbordOptions } = require('./options.cjs');

/**
 * Starts error tracking for devbord. Takes the options of `@sentry/node`, with these differences: the DSN, release
 * and environment fall back to `DEVBORD_DSN`, `DEVBORD_RELEASE` and `DEVBORD_ENVIRONMENT`; user details, cookies and
 * request bodies are not collected unless `dataCollection` asks for them; profiles, logs and metrics are never sent.
 * @param {import('@sentry/node').NodeOptions} [options]
 * @returns {import('@sentry/node').NodeClient | undefined}
 */
function init(options) {
  return Sentry.init(devbordOptions(options, Sentry.SDK_VERSION));
}

module.exports = { ...Sentry, init, VERSION };
