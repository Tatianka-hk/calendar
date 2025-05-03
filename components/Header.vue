<template>
    <div
        class="border-2 border-secondary px-4 py-7 flex justify-between rounded-t-[20px]"
    >
        <Button>Створити подію</Button>
        <div class="flex gap-4">
            <Button>Тиждень</Button>
            <Button>День</Button>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { Button } from "~/ui";
</script>
