import type { Dispatcher } from "undici";
/**
 * VeriffError class.
 */
export declare class VeriffError extends Error {
    readonly name = "VeriffError";
    readonly response: Exclude<Dispatcher.ResponseData, "body">;
    readonly body?: unknown;
    readonly reason?: string;
    /**
     * Constructor.
     */
    constructor(response: Exclude<Dispatcher.ResponseData, "body">, body?: unknown, reason?: string);
}
//# sourceMappingURL=error.d.ts.map