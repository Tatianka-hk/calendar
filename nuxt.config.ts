// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ["~/public/index.css"],
    devtools: { enabled: true },
    compatibilityDate: "2025-04-06",
    modules: ["@nuxtjs/tailwindcss"],
});
