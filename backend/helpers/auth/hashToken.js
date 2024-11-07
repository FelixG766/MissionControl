import crypto from "node:crypto";

export const hashToken = (token) => {
    // calculate hash value using SHA256
    return crypto.createHash("sha256").update(token.toString()).digest("hex");
}