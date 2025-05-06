import * as crypto from "node:crypto";
import * as unidici from "undici";
import type { AuthorizationOptions } from "./types.ts";
import type { Dispatcher } from "undici";
import { Buffer } from "node:buffer";
import { VeriffError } from "./error.ts";

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
export class Caller {
  private readonly baseUrl = "https://stationapi.veriff.com";
  private readonly authorizationOptions: AuthorizationOptions;
  private readonly callerOption: CallerOptions;

  /**
   * Constructor.
   */
  public constructor(
    authorizationOptions: AuthorizationOptions,
    callerOptions: CallerOptions
  ) {
    this.authorizationOptions = authorizationOptions;
    this.callerOption = callerOptions;
  }

  /**
   * Make request.
   */
  public async makeRequest(
    method: Dispatcher.HttpMethod,
    path: string,
    payload?: Record<string, unknown>,
    headers?: Record<string, string | string[]>
  ): Promise<unknown> {
    const requestId = crypto.randomUUID();
    const url = new URL(path, this.baseUrl);

    try {
      const startedAt = performance.now();
      const response = await unidici.request(url, {
        ...(payload && { body: JSON.stringify(payload) }),
        headers: {
          "x-auth-client": this.authorizationOptions.apiToken,
          "content-type": "application/json",
          ...(payload && { "x-hmac-signature": this.signRequest(payload) }),
          ...headers,
        },
        method,
      });
      const endedAt = performance.now();

      this.callerOption.logger?.info(
        `Received response for request ${requestId}`,
        {
          body: response.body,
          duration: endedAt - startedAt,
          headers: response.headers,
          method,
          statusCode: response.statusCode,
          trailers: response.trailers,
          url,
        }
      );

      const responsePayload = await response.body.json();

      if ([400, 401, 404, 500].includes(response.statusCode)) {
        throw new VeriffError(
          response,
          responsePayload,
          (responsePayload as { code: string })?.code
        );
      }

      return responsePayload;
    } catch (e) {
      this.callerOption.logger?.error(
        `Request ${requestId} failed with error`,
        {
          error: e,
          method,
          url,
        }
      );

      throw e;
    }
  }

  /**
   * Sign request.
   */
  public signRequest(payload: Record<string, unknown> | string): string {
    const str = typeof payload === "object" ? JSON.stringify(payload) : payload;

    return crypto
      .createHmac("sha256", this.authorizationOptions.apiSecret)
      .update(Buffer.from(str, "utf8"))
      .digest("hex")
      .toLowerCase();
  }
}
