import mongoose from "mongoose";
import type { Nitro } from "nitropack";
import Logger, { StatusEnum } from "~/server/logger";
const logger = new Logger();
const URI = process.env.MONGODB_URI || "";
export default async (_nitroapp: Nitro) => {
    mongoose
        .connect(URI)
        .then(() => {
            logger.info("init", "DB connected", StatusEnum.SUCCESS);
        })
        .catch((e) => {
            logger.info("init", e, StatusEnum.ERROR);
            console.error(e);
        });
};
