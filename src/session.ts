import { Caller, type CallerOptions } from "./caller.ts";
import type {
  AuthorizationOptions,
  CreateSessionRequest,
  SessionResponse,
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
}
