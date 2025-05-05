import * as crypto from "node:crypto";
import type { AuthorizationOptions } from "./types.ts";

/**
 * Webhook API.
 */
export class WebhookAPI {
  private readonly authorizationOptions: AuthorizationOptions;

  /**
   * Constructor.
   */
  public constructor(authorizationOptions: AuthorizationOptions) {
    this.authorizationOptions = authorizationOptions;
  }

  /**
   * Parse webhook request.
   */
  async parseWebhook(request: Request): Promise<unknown> {
    const payload = await request.json();
    const signature = request.headers.get("x-hmac-signature");
    const hash = crypto
      .createHmac("sha256", this.authorizationOptions.apiSecret)
      .update(JSON.stringify(payload));

    if (hash.digest("hex") !== signature?.toLowerCase()) {
      throw new Error("Invalid signature");
    }

    return payload;
  }
}
