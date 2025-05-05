import * as crypto from "node:crypto";
/**
 * Webhook API.
 */
export class WebhookAPI {
    authorizationOptions;
    /**
     * Constructor.
     */
    constructor(authorizationOptions) {
        this.authorizationOptions = authorizationOptions;
    }
    /**
     * Parse webhook request.
     */
    async parseWebhook(request) {
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
//# sourceMappingURL=webhook.js.map