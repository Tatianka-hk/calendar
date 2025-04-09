// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: ["~/assets/css/tailwind.css"],
    devtools: { enabled: true },
    compatibilityDate: "2025-04-06",
    modules: ["@nuxtjs/tailwindcss"],
});
