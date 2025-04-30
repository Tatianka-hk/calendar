import { defineNuxtRouteMiddleware } from "nuxt/app";

export default defineNuxtRouteMiddleware(async (event) => {
    // const url = event.node.req.url || "";
    // if (url.startsWith("/api/auth") || url.startsWith("/server/auth"))
    //     return sendError(
    //         event,
    //         createError({
    //             statusCode: 401,
    //             statusMessage: "Unauthorized",
    //         })
    //     );
    // const body = await readBody(event);
    // console.log("middleware");
    // console.log(body);
    // const token = body.token;
    // console.log(token);
});
