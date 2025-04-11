import jsonwebtoken from "jsonwebtoken";
const { sign, verify } = jsonwebtoken;
import { User } from "./types/user";
export class JWTToken {
    token: string;
    constructor(token: string) {
        this.token = token;
    }

    createToken(user: User): string {
        return sign(user, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });
    }

    isTokenValid(token: string): boolean | Object {
        return verify(token, process.env.JWT_SECRET);
    }
}
