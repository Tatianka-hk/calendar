<template>
    <div
        class="border-2 border-secondary px-4 py-7 flex justify-between rounded-t-[20px]"
    >
        <Button @click="openDialog">Створити подію</Button>
        <div class="flex gap-4 w-[60px] md:w-[160px]">
            <Button class="">Тиждень</Button>
            <Button>День</Button>
        </div>
        <div v-if="opened"><CreateEvent :onClose="closeDialog" /></div>
    </div>
</template>
<script lang="ts" setup>
import { Button } from "~/ui";
import { useDialog } from "../composables";
import { CreateEvent } from "./";
const { opened, openDialog, closeDialog } = useDialog();
</script>
