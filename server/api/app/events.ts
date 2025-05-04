import { defineEventHandler, readBody } from "h3";
import Logger, { StatusEnum } from "~/server/logger";
const logger = new Logger();
export default defineEventHandler(async (event) => {
    try {
        const res = ["1", "2", "3"];

        return { res };
    } catch (error) {
        logger.info("getEvents", "Internal server error", StatusEnum.ERROR);
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Internal server error",
            })
        );
    }
});
