import type { AuthorizationOptions } from "./types.ts";
import type { Dispatcher } from "undici";
/**
 * Logger options.
 */
export type LoggerOptions = {
    info: (message: string, payload?: Record<string, unknown>) => void;
    error: (message: string, payload?: Record<string, unknown>) => void;
    debug: (message: string, payload?: Record<string, unknown>) => void;
    warn: (message: string, payload?: Record<string, unknown>) => void;
};
/**
 * Caller options.
 */
export type CallerOptions = {
    logger?: LoggerOptions;
    live: boolean;
};
/**
 * Caller is responsible for making API calls to the Veriff API.
 */
export declare class Caller {
    private readonly baseUrl;
    private readonly authorizationOptions;
    private readonly callerOption;
    /**
     * Constructor.
     */
    constructor(authorizationOptions: AuthorizationOptions, callerOptions: CallerOptions);
    /**
     * Make request.
     */
    makeRequest(method: Dispatcher.HttpMethod, path: string, payload?: Record<string, unknown>, headers?: Record<string, string | string[]>): Promise<unknown>;
    /**
     * Sign request.
     */
    signRequest(payload: Record<string, unknown> | string): string;
}
//# sourceMappingURL=caller.d.ts.map