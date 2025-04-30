import mongoose from "mongoose";
import type { Nitro } from "nitropack";

const URI = process.env.MONGODB_URI || "";
console.log("URL: ", URI);
export default async (_nitroapp: Nitro) => {
    mongoose
        .connect(URI)
        .then(() => {
            console.log("DB connected");
        })
        .catch((e) => {
            console.error("Error during DB connection", e);
        });
};
