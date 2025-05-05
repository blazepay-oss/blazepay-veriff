/**
 * Authorization options.
 */
export type AuthorizationOptions = {
  apiToken: string;
  apiSecret: string;
};

/**
 * Create session request.
 */
export type CreateSessionRequest = {
  verification: {
    callback: string;
    person: {
      firstName: string;
      lastName: string;
      idNumber?: string;
      gender?: string;
      dateOfBirth: string;
      phone: string;
    };
    document?: {
      number: string;
      country: string;
      type:
        | "PASSPORT"
        | "ID_CARD"
        | "RESIDENCE_PERMIT"
        | "DRIVERS_LICENSE"
        | "VISA";
    };
    address: {
      fullAddress?: string;
    };
    vendorData?: string;
    endUserId?: string;
    consents?: {
      type: string;
      approved: boolean;
    }[];
  };
};

/**
 * Session response.
 */
export type SessionResponse = {
  status: "success";
  verification: {
    id: string;
    url: string;
    vendorData?: string; // Max 1000 characters
    endUserId?: string;
    host: string;
    sessionToken: string;
  };
};
