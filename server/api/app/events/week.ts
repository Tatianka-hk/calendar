import { defineEventHandler, readBody } from "h3";
import Logger, { StatusEnum } from "~/server/logger";
import Event from "../../../models/Event";
const logger = new Logger();
export default defineEventHandler(async (event) => {
    try {
        const query = getQuery(event);
        const selectedDay = query.day;
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

        const dayOfWeek = parsedDate.getDay();

        const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
        const monday = new Date(parsedDate);
        monday.setDate(parsedDate.getDate() + diffToMonday);
        monday.setHours(0, 0, 0, 0);

        const sunday = new Date(monday);
        sunday.setDate(monday.getDate() + 6);
        sunday.setHours(23, 59, 59, 999);

        const events = await Event.find({
            date: {
                $gte: monday,
                $lte: sunday,
            },
        });
        const week = Array.from({ length: 7 }, (_, i) => {
            const day = new Date(monday);
            day.setDate(monday.getDate() + i);
            day.setHours(0, 0, 0, 0);
            return {
                date: day,
                events: [] as typeof events,
            };
        });

        for (const event of events) {
            const eventDate = new Date(event.date);
            eventDate.setHours(0, 0, 0, 0);

            const index = Math.floor(
                (eventDate.getTime() - monday.getTime()) / (1000 * 60 * 60 * 24)
            );

            if (index >= 0 && index < 7) {
                week[index].events.push(event);
            }
        }

        return { week };
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
