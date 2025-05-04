import { defineEventHandler, readBody } from "h3";
import bcrypt from "bcryptjs";
import User from "../../models/User";
import { JWTToken } from "../../jwt";
import Logger, { StatusEnum } from "../../logger";
const logger = new Logger();
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email, password } = body;
    const salt = process.env.SALT;

    if (!email || !password) {
        logger.info(
            "signin",
            "Email and password are required",
            StatusEnum.ERROR
        );
        return sendError(
            event,
            createError({
                statusCode: 400,
                statusMessage: "Email and password are required",
            })
        );
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            logger.info("signin", "User not found", StatusEnum.ERROR);
            return sendError(
                event,
                createError({
                    statusCode: 400,
                    statusMessage: "User not found",
                })
            );
        }

        const isValid = await bcrypt.compare(password + salt, user.password);
        if (!isValid) {
            logger.info("signin", "Invalid password", StatusEnum.ERROR);
            return sendError(
                event,
                createError({
                    statusCode: 400,
                    statusMessage: "Invalid password",
                })
            );
        }
        const jwtToken = new JWTToken().createToken(user.toJSON());
        logger.info("signin", "user is signed in", StatusEnum.SUCCESS);
        return { jwtToken };
    } catch (error) {
        logger.info("signin", "Internal server error", StatusEnum.ERROR);
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Internal server error",
            })
        );
    }
});
