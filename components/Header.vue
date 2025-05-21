<template>
    <div
        class="border-2 border-secondary px-4 py-7 flex justify-between rounded-t-[20px]"
    >
        <Button @click="openDialog">Створити подію</Button>
        <div class="flex gap-4">
            <Button
                @click="changeMode('week')"
                :backgroundColor="mode === 'week' ? '#34558b' : '#00a4b8'"
                >Тиждень</Button
            >
            <Button
                :backgroundColor="mode === 'day' ? '#34558b' : '#00a4b8'"
                @click="changeMode('day')"
                >День</Button
            >
        </div>
        <div v-if="opened"><CreateEvent :onClose="closeDialog" /></div>
    </div>
</template>
<script lang="ts" setup>
import { Button } from "~/ui";
import { useDialog } from "../composables";
import { CreateEvent } from "./";
const { opened, openDialog, closeDialog } = useDialog();
const emit = defineEmits();
const mode = ref<string>("day");
const changeMode = (modeToSet: string) => {
    mode.value = modeToSet;
    emit("changedMode", modeToSet);
};
</script>
