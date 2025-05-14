import { JWTToken } from "~/server/jwt";
import Logger, { StatusEnum } from "~/server/logger";
const logger = new Logger();
export default defineEventHandler((event) => {
    try {
        const authHeader = getRequestHeader(event, "authorization");
        const token = authHeader?.split(" ")[1];
        if (!event.path.startsWith("/api/app")) return;
        const decodedToken = new JWTToken().isTokenValid(token);
        if (decodedToken === false) {
            logger.info("middleware", "Unauthorized", StatusEnum.ERROR);
            return {
                statusCode: 401,
                statusMessage: "Unauthorized",
            };
        }
        event.context.user = decodedToken;

        console.log("decodedToken", decodedToken);
    } catch (e) {
        logger.info("middleware", "Unauthorized", StatusEnum.ERROR);
        return {
            statusCode: 401,
            statusMessage: "Unauthorized",
        };
    }
});
