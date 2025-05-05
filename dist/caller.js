import * as crypto from "node:crypto";
import * as unidici from "undici";
import { Buffer } from "node:buffer";
import { VeriffError } from "./error.js";
/**
 * Caller is responsible for making API calls to the Veriff API.
 */
export class Caller {
    baseUrl = "https://api.veriff.me/v1";
    authorizationOptions;
    logger;
    /**
     * Constructor.
     */
    constructor(authorizationOptions, callerOptions) {
        this.authorizationOptions = authorizationOptions;
        this.logger = callerOptions.logger;
    }
    /**
     * Make request.
     */
    async makeRequest(method, path, payload, headers) {
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
            this.logger?.info(`Received response for request ${requestId}`, {
                body: response.body,
                duration: endedAt - startedAt,
                headers: response.headers,
                method,
                statusCode: response.statusCode,
                trailers: response.trailers,
                url,
            });
            const responsePayload = await response.body.json();
            if ([400, 401, 404, 500].includes(response.statusCode)) {
                throw new VeriffError(response, responsePayload, responsePayload?.code);
            }
            return responsePayload;
        }
        catch (e) {
            this.logger?.error(`Request ${requestId} failed with error`, {
                error: e,
                method,
                url,
            });
            throw e;
        }
    }
    /**
     * Sign request.
     */
    signRequest(payload) {
        const str = typeof payload === "object" ? JSON.stringify(payload) : payload;
        return crypto
            .createHmac("sha256", this.authorizationOptions.apiSecret)
            .update(Buffer.from(str, "utf8"))
            .digest("hex")
            .toLowerCase();
    }
}
//# sourceMappingURL=caller.js.map