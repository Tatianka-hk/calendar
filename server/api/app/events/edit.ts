import { defineEventHandler, readBody, sendError, createError } from "h3";
import Event from "../../../models/Event";
import Logger, { StatusEnum } from "../../../logger";
import { ObjectId } from "mongodb";
const logger = new Logger();

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const eventToUpdate = body;
    const user = event.context.user;

    try {
        const { _id, name, description, date, time } = eventToUpdate;
        console.log(_id, name, description, date, time);

        await Event.updateOne(
            { _id: new ObjectId(_id) },
            {
                $set: {
                    name,
                    description,
                    date,
                    time,
                },
            }
        );

        logger.info("Event", "Event updated successfully", StatusEnum.SUCCESS);

        return {
            status: "success",
            message: "Events updated",
        };
    } catch (error: any) {
        logger.info("updateEvent", "Internal server error", StatusEnum.ERROR);
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: error.message || "Internal server error",
            })
        );
    }
});
