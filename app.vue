<template>
    <NuxtLayout>
        <NuxtPage />
        <Snackbar />
        <div class="flex z-10" id="dialog"></div>
    </NuxtLayout>
</template>
<script setup lang="ts">
import Snackbar from "~/ui/Snackbar.vue";
</script>
