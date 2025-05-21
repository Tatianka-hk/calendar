import { defineEventHandler, readBody } from "h3";
import Event from "../../../models/Event";
import Logger, { StatusEnum } from "../../../logger";
const logger = new Logger();
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { name, description, date, time } = body;
    const user = event.context.user;

    try {
        const newEvent = new Event({
            name,
            description,
            date,
            time,
            userID: user._id,
        });
        await newEvent.save();

        logger.info("Event", "Event created successfully", StatusEnum.SUCCESS);
        return {
            statusCode: 200,
            statusMessage: "Event created",
        };
    } catch (error) {
        logger.info("signin", "Internal server error", StatusEnum.ERROR);
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: error.message || "Internal server error",
            })
        );
    }
});
