import { defineEventHandler, readBody, sendError, createError } from "h3";
import Event from "../../../models/Event";
import Logger, { StatusEnum } from "../../../logger";

const logger = new Logger();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const eventsToUpdate = body;
    const user = event.context.user;

    if (!Array.isArray(eventsToUpdate)) {
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Expected 'events' array in request body",
            })
        );
    }

    try {
        for (const updatedEvent of eventsToUpdate) {
            const { _id, date, time } = updatedEvent;

            if (!_id) continue;

            await Event.updateOne(
                { _id, userID: user._id },
                {
                    $set: {
                        date,
                        time,
                    },
                }
            );
        }

        logger.info("Event", "Events updated successfully", StatusEnum.SUCCESS);

        return {
            status: "success",
            message: "Events updated",
        };
    } catch (error: any) {
        logger.info("updateEvents", "Internal server error", StatusEnum.ERROR);
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: error.message || "Internal server error",
            })
        );
    }
});
