import type { Dispatcher } from "undici";

/**
 * Constants.
 */
const errorMessages: Record<string, string> = {
  "1001": "Query ID must be between 20 and 40 symbols.",
  "1002": "Query ID must be a valid UUID V4",
  "1003": "Query ID must be unique, it has already been used.",
  "1102": "Mandatory parameters are missing from the request.",
  "1104": "Request includes invalid parameters.",
  "1201": "Invalid timestamp. Timestamp must not be older than one hour.",
  "1202":
    "Timestamp format is incorrect. YYYY-MM-DDTHH:MM:S+Timezone Offset|Z or UTC.",
  "1203": "Invalid ISO 8601 date. Date needs to be in format YYYY-MM-DD.",
  "1301": "Requested features are not supported.",
  "1302": "Only HTTPS return URLs are allowed.",
  "1303": "Invalid status.",
  "1304": 'Cannot transition to "$STATUS" status.',
  "1308": "ID number is missing.",
  "1309":
    "SSN validation requires person firstName + lastName OR fullName to be provided.",
  "1310":
    "SSN validation requires person.dateOfBirth or address data to be provided.",
  "1400": "Image data not found.",
  "1401": "Image is not in valid base64.",
  "1402": "Image context is not supported.",
  "1403": "Image property is missing.",
  "1500":
    "vendorData field cannot be more than 1000 symbols. We require only non-semantic data to be submitted (UUID-s etc., that can not be resolved or used outside the customer's domain)",
  "1501":
    "vendorData must be a string. We require only non-semantic data to be submitted (UUID-s etc., that can not be resolved or used outside the customer's domain)",
  "2003": "Date of birth is not a valid date.",
  "2101": "Document number has to be between 6 and 9 characters.",
  "2102": "Document number may contain only characters and numbers A-Z, 0-9.",
  "2103": "Document type is not supported.",
  "2104": "Document from provided country is not supported.",
};

/**
 * VeriffError class.
 */
export class VeriffError extends Error {
  public readonly name = "VeriffError";
  public readonly response: Exclude<Dispatcher.ResponseData, "body">;
  public readonly body?: unknown;
  public readonly reason?: string;

  /**
   * Constructor.
   */
  public constructor(
    response: Exclude<Dispatcher.ResponseData, "body">,
    body?: unknown,
    reason?: string
  ) {
    super(errorMessages[reason ?? ""] ?? "Unknown error");
    this.response = response;
    this.body = body;
    this.reason = reason;
  }
}
