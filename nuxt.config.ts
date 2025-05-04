// nuxt.config.ts
export default defineNuxtConfig({
    css: ["~/assets/css/tailwind.css"],
    devtools: { enabled: true },
    compatibilityDate: "2025-04-06",
    modules: ["@nuxtjs/tailwindcss"],
    nitro: {
        plugins: ["~/server/db/connect.ts"],
    },
    serverMiddleware: [
        {
            path: "/api/app", // Застосовується тільки до маршруту /api/app
            handler: "~/server/middleware/auth.ts",
        },
    ],
});
