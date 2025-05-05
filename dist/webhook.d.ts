import type { AuthorizationOptions } from "./types.ts";
/**
 * Webhook API.
 */
export declare class WebhookAPI {
    private readonly authorizationOptions;
    /**
     * Constructor.
     */
    constructor(authorizationOptions: AuthorizationOptions);
    /**
     * Parse webhook request.
     */
    parseWebhook(request: Request): Promise<unknown>;
}
//# sourceMappingURL=webhook.d.ts.map