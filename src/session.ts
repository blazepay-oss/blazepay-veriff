import { Caller, type CallerOptions } from "./caller.ts";
import type {
  AuthorizationOptions,
  CreateSessionRequest,
  SessionDecisionResponse,
  SessionResponse,
  UploadedSessionMediaResponse,
} from "./types.ts";

/**
 * Types.
 */
export type SessionsAPIOptions = CallerOptions;

/**
 * Session API.
 */
export class SessionAPI {
  private readonly caller: Caller;

  /**
   * Constructor.
   */
  public constructor(
    authorizationOptions: AuthorizationOptions,
    callerOptions: SessionsAPIOptions
  ) {
    this.caller = new Caller(authorizationOptions, callerOptions);
  }

  /**
   * Create a session.
   *
   * @link https://developers.VERIFF.com/#post-sessions.
   */
  public async createSession(
    payload: CreateSessionRequest
  ): Promise<SessionResponse> {
    return (await this.caller.makeRequest(
      "POST",
      "/sessions",
      payload
    )) as SessionResponse;
  }

  /**
   * Get session decision.
   *
   * @link https://developers.VERIFF.com/#get-sessions-sessionid-decision.
   */
  public async getSessionDecision(
    sessionId: string
  ): Promise<SessionDecisionResponse> {
    return (await this.caller.makeRequest(
      "GET",
      `/sessions/${sessionId}/decision`,
      { "x-hmac-signature": this.caller.signRequest(sessionId) }
    )) as SessionDecisionResponse;
  }

  /**
   * Get uploaded session media.
   *
   * @link https://developers.VERIFF.com/#get-sessions-sessionid-media.
   */
  public async getUploadedSessionMedia(
    sessionId: string
  ): Promise<UploadedSessionMediaResponse> {
    return (await this.caller.makeRequest(
      "GET",
      `/sessions/${sessionId}/media`,
      { "x-hmac-signature": this.caller.signRequest(sessionId) }
    )) as UploadedSessionMediaResponse;
  }
}
