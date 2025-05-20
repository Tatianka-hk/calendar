import { defineEventHandler, readBody, sendError, createError } from "h3";
import Event from "../../../models/Event";
import Logger, { StatusEnum } from "../../../logger";

const logger = new Logger();

export default defineEventHandler(async (event) => {
    const query = getQuery(event);
    const eventID = query.id;
    const user = event.context.user;

    try {
        await Event.deleteOne({ _id: eventID, userID: user._id });

        logger.info("Event", "Event deleted successfully", StatusEnum.SUCCESS);

        return {
            status: "success",
            message: "Events deleted",
        };
    } catch (error: any) {
        logger.info("deleteEvent", "Internal server error", StatusEnum.ERROR);
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: error.message || "Internal server error",
            })
        );
    }
});
