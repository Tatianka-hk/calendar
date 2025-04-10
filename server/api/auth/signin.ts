import { defineEventHandler, readBody } from "h3";
import bcrypt from "bcryptjs";
import User from "../../models/User";
export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { email, password } = body;
    const salt = process.env.SALT;

    if (!email || !password) {
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
            return sendError(
                event,
                createError({
                    statusCode: 400,
                    statusMessage: "Invalid password",
                })
            );
        }

        return user;
    } catch (error) {
        console.error(error);
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Internal server error",
            })
        );
    }
});
