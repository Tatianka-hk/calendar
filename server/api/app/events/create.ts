import { defineEventHandler, readBody } from "h3";
import Event from "../../../models/Event";
import Logger, { StatusEnum } from "../../../logger";
const logger = new Logger();
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    console.log(body);
    const { name, description, date, time } = body;
    console.log(name, description, date, time);
    const user = event.context.user;
    console.log(user);

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
