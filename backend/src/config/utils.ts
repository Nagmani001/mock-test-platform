export const JWT_SECRET = "nagmani";
import { Request } from "express";
const JWKS_PUBLICKEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAndV3w8Eu2YoQf4+lY4Gn
+6PYdJRbw1NLJIIaiBvVNSMc/mcNG4Ye6WB9cbKZyomnKSQ+l4vEagNRaGC4ZHYb
fXKjc14GvDp6rZBl5kbWzkeusBZwrTMkpTvOs2p8Y5j74ixMff6K6oApY/KW+LXO
RUpq0rVvaPvom60WS+uJ8mRiSBow7gD864K//+/SYMnItUomDadawBdQafV1ZKz9
RNc/whJci4MTLD1MoEihU+1/z88PCOBo7OfgJVmA4jUddjlnBE5bCpqqRX4jYtQ0
lvpPFZ6j2S5mkgA4b91JXWjq3CMFUMK4Odfz/OsN4RLt4AllUlBL6gzM/Pk0LY1o
lwIDAQAB
-----END PUBLIC KEY-----`;

export async function checkCredentials(req: Request) {

}
