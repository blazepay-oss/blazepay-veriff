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
            type: "PASSPORT" | "ID_CARD" | "RESIDENCE_PERMIT" | "DRIVERS_LICENSE" | "VISA";
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
        vendorData?: string;
        endUserId?: string;
        host: string;
        sessionToken: string;
    };
};
/**
 * Verification response.
 */
export type VerificationRespose = {
    id: string;
    code: 9001 | 9102 | 9103 | 9104 | 9121;
    attemptId: string;
    person: {
        gender: "M" | "F" | null;
        idNumber?: string;
        lastName?: string;
        firstName?: string;
        citizenship: null;
        dateOfBirth: string;
        nationality?: string;
        yearOfBirth?: string;
        placeOfBirth?: string;
        pepSanctionMatch?: string;
        occupation?: string;
        employer?: string;
        foreignerStatus?: string;
        extraNames?: string;
        title?: string;
        addresses?: {
            fullAddress: string;
            parsedAddress?: {
                city?: string;
                unit?: string;
                state?: string;
                street?: string;
                country?: string;
                postcode?: string;
                houseNumber?: string;
            };
        }[];
    };
    reason?: string;
    statusCode: string;
    comments: any[];
    document: {
        type: "PASSPORT" | "ID_CARD" | "RESIDENCE_PERMIT" | "DRIVERS_LICENSE" | "VISA" | "OTHER";
        number?: string;
        country?: string;
        remarks: string;
        state?: string;
        validFrom?: string;
        validUntil?: string;
        placeOfIssue?: string;
        firstIssue?: string;
        issueNumber?: string;
        issuedBy?: string;
        nfcValidated?: boolean;
        residencePermitType?: string;
        portraitIsVisible?: boolean;
        signatureIsVisible?: boolean;
        specimen?: {
            containsContactlessChip: boolean;
            firstIssuedDate: string;
            lastIssuedDate: string;
            nistVersion: string;
            digitalDocument: boolean;
            nonStandardDrivingLicense: boolean;
            militaryDocument: boolean;
            temporaryEmergencyDocument: boolean;
            asylumRefugeeDocument: boolean;
            ICAOStandardizedDocument: boolean;
            notNationalIdCard: boolean;
            legalStatus: "primary" | "secondary" | "tertiary" | null;
            hasSecurityRisk: boolean;
        };
    };
    reasonCode?: number;
    vendorData?: string;
    endUserId?: string;
    decisionTime: string;
    acceptanceTime: string;
    highRisk?: boolean;
    additionalVerifiedData: object;
    driversLicenseCategory: {
        B?: boolean;
        driversLicenseCategoryFrom?: {
            B?: string;
        };
        driversLicenseCategoryUntil?: {
            B?: string;
        };
        driversLicenseCategories?: string[];
    };
    estimatedAge?: number;
    estimatedGender?: number;
    processNumber?: string;
    driversLicenseNumber?: string;
    cpfValidation?: {
        status?: string;
        cpfNumber?: string;
        name?: string;
        dateOfBirth?: string;
        yearOfDeath?: string;
    };
    ineBiometricRegistryValidation?: {
        faceMatch?: boolean;
        faceMatchPercentage?: number;
        responseStatus: "success" | "failure" | null;
    };
    riskScore: {
        score: number;
        riskLabels?: {
            label: string;
            category: "client_data_mismatch" | "cross-links" | "device" | "document" | "images" | "network" | "session" | "person";
            sessionIds: string[];
        }[];
    };
    biometricAuthentication?: {
        matchedSessionId?: string;
        matchedSessionEndUserId?: string;
        matchedSessionVendorData?: string;
    };
    details: object;
    technicalData: {
        ip?: string;
    };
};
/**
 * Decision webhook response.
 */
export type DecisionWebhook = {
    status: "approved" | "resubmission_requested" | "declined" | "expired" | "abandoned";
    verification: VerificationRespose;
};
/**
 * Session decision response.
 */
export type SessionDecisionResponse = {
    status: "success";
    verification: VerificationRespose;
};
/**
 * Uploaded session media response.
 */
export type UploadedSessionMediaResponse = {
    status: "success";
    videos: {
        context: string;
        id: string;
        mimetype: string;
        name: string;
        sessionId: string;
        duration: string;
        url: string;
        size: number;
    }[];
    images: {
        context: string;
        id: string;
        name: string;
        url: string;
        sessionId: string;
        size: number;
        mimetype: string;
    }[];
};
//# sourceMappingURL=types.d.ts.map