import { init as sentryInit } from '@sentry/browser';

export * from '@sentry/browser';

/** Version of `@devbord/browser`. */
export declare const VERSION: string;

/**
 * Starts error tracking for devbord. Takes the options of `@sentry/browser`, with these differences: user details,
 * cookies and request bodies are not collected unless `dataCollection` asks for them, and replays, profiles, logs
 * and metrics are never sent.
 */
export declare function init(options?: Parameters<typeof sentryInit>[0]): ReturnType<typeof sentryInit>;
