import bcrypt from "bcryptjs";
import { defineEventHandler, readBody, sendError, createError } from "h3";
import User from "../../models/User";

export default defineEventHandler(async (event) => {
    const salt = process.env.SALT;
    const body = await readBody(event);
    const { email, password } = body;

    // Validate email and password presence
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
        const existingUser = await User.findOne({ email });

        if (existingUser) {
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

        return { message: "User registered successfully" };
    } catch (err) {
        console.error(err);
        return sendError(
            event,
            createError({
                statusCode: 500,
                statusMessage: "Internal server error",
            })
        );
    }
});
