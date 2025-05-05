import { Caller } from "./caller.js";
/**
 * Session API.
 */
export class SessionAPI {
    caller;
    /**
     * Constructor.
     */
    constructor(authorizationOptions, callerOptions) {
        this.caller = new Caller(authorizationOptions, callerOptions);
    }
    /**
     * Create a session.
     *
     * @link https://developers.VERIFF.com/#post-sessions.
     */
    async createSession(payload) {
        return (await this.caller.makeRequest("POST", "/sessions", payload));
    }
    /**
     * Get session decision.
     *
     * @link https://developers.VERIFF.com/#get-sessions-sessionid-decision.
     */
    async getSessionDecision(sessionId) {
        return (await this.caller.makeRequest("GET", `/sessions/${sessionId}/decision`, { "x-hmac-signature": this.caller.signRequest(sessionId) }));
    }
    /**
     * Get uploaded session media.
     *
     * @link https://developers.VERIFF.com/#get-sessions-sessionid-media.
     */
    async getUploadedSessionMedia(sessionId) {
        return (await this.caller.makeRequest("GET", `/sessions/${sessionId}/media`, { "x-hmac-signature": this.caller.signRequest(sessionId) }));
    }
}
//# sourceMappingURL=session.js.map