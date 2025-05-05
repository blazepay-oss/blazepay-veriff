import { type CallerOptions } from "./caller.ts";
import type { AuthorizationOptions, CreateSessionRequest, SessionDecisionResponse, SessionResponse, UploadedSessionMediaResponse } from "./types.ts";
/**
 * Types.
 */
export type SessionsAPIOptions = CallerOptions;
/**
 * Session API.
 */
export declare class SessionAPI {
    private readonly caller;
    /**
     * Constructor.
     */
    constructor(authorizationOptions: AuthorizationOptions, callerOptions: SessionsAPIOptions);
    /**
     * Create a session.
     *
     * @link https://developers.VERIFF.com/#post-sessions.
     */
    createSession(payload: CreateSessionRequest): Promise<SessionResponse>;
    /**
     * Get session decision.
     *
     * @link https://developers.VERIFF.com/#get-sessions-sessionid-decision.
     */
    getSessionDecision(sessionId: string): Promise<SessionDecisionResponse>;
    /**
     * Get uploaded session media.
     *
     * @link https://developers.VERIFF.com/#get-sessions-sessionid-media.
     */
    getUploadedSessionMedia(sessionId: string): Promise<UploadedSessionMediaResponse>;
}
//# sourceMappingURL=session.d.ts.map