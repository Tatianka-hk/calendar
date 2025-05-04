import bcrypt from "bcryptjs";
import { defineEventHandler, readBody, sendError, createError } from "h3";
import User from "../../models/User";
import Logger, { StatusEnum } from "../../logger";
const logger = new Logger();
export default defineEventHandler(async (event) => {
    const salt = process.env.SALT;
    const body = await readBody(event);
    const { email, password } = body;
    if (!email || !password) {
        logger.info(
            "signup",
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
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            logger.info("signup", "User already exists", StatusEnum.ERROR);
            return sendError(
                event,
                createError({
                    statusCode: 400,
                    statusMessage: "User already exists",
                })
            );
        }

        const hashedPassword = await bcrypt.hash(password + salt, 10);

        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();

        logger.info(
            "signup",
            "User registered successfully",
            StatusEnum.SUCCESS
        );
        return { message: "User registered successfully" };
    } catch (err) {
        logger.info("signup", "Internal server error", StatusEnum.ERROR);
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Internal server error",
            })
        );
    }
});
