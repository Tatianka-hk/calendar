import { defineEventHandler, readBody } from "h3";
import Logger, { StatusEnum } from "~/server/logger";
import Event from "../../../models/Event";
const logger = new Logger();
export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const selectedDay = query.day;
        console.log("selectedDay", selectedDay);
        if (!selectedDay) {
            logger.info("getEvents", "Day is required", StatusEnum.ERROR);
            return sendError(
                event,
                createError({
                    statusCode: 400,
                    statusMessage: "Day is required",
                })
            );
        }

        const parsedDate = new Date(selectedDay);

        const events = await Event.find({
            date: parsedDate,
        });

        return { events };
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
