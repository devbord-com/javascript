import { init as sentryInit } from '@sentry/node';

export * from '@sentry/node';

/** Version of `@devbord/node`. */
export declare const VERSION: string;

/**
 * Starts error tracking for devbord. Takes the options of `@sentry/node`, with these differences: the DSN, release
 * and environment fall back to `DEVBORD_DSN`, `DEVBORD_RELEASE` and `DEVBORD_ENVIRONMENT`; user details, cookies and
 * request bodies are not collected unless `dataCollection` asks for them; profiles, logs and metrics are never sent.
 */
export declare function init(options?: Parameters<typeof sentryInit>[0]): ReturnType<typeof sentryInit>;
