<template>
    <div class="w-[100vw] h-[100vh] bg-background">
        <div class="flex md:gap-8 gap-2 items-center justify-center">
            <AppIcon class="md:h-[150px] md:w-[150px] h-[50px] w-[50px]" />
            <span class="md:text-[120px] text-[30px] text-primary"
                >Calendar</span
            >
        </div>
    </div>
</template>
<script setup lang="ts">
import { AppIcon } from "~/assets/icons";
</script>
